import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  [key: string]: any;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: any;
}

export const authenticate = async (request: NextRequest) => {
  try {
    const token = request.headers.get('Authorization');
    
    if (!token) {
      throw new Error('No token provided');
    }
    console.log('Token:*************************** ', token.substring(7), token.startsWith('Bearer '));

    // Remove 'Bearer ' prefix if present
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    
    console.log('Token:*************************** ', cleanToken);

    const decoded = jwt.verify(cleanToken, process.env.SECRET_KEY as string) as JwtPayload;
   console.log('----------------------------------------> ',decoded);
    if (!decoded) {
      throw new Error('Invalid token');
    }
     
    
    const user = await prisma.user.findUnique({
      where: {
        userId: decoded.userId
      }
    });

    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Helper function to use in API routes that need authentication
export const withAuth = (handler: (request: NextRequest, user: any, params?: any) => Promise<Response>) => {
  return async (request: NextRequest, context?: { params: any }) => {
    try {
      const user = await authenticate(request);
      return await handler(request, user, context?.params);
    } catch (error) {
      return Response.json(
        { 
          success: false, 
          message: error instanceof Error ? error.message : 'Authentication failed' 
        },
        { status: 401 }
      );
    }
  };
};