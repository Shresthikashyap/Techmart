import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export const authenticate = async (request: NextRequest): Promise<User> => {
  try {
    const token = request.headers.get('Authorization');
    
    if (!token) {
      throw new Error('No token provided');
    }
    console.log('Token:*************************** ', token);

    // Remove 'Bearer ' prefix if present
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    
    console.log('Token:*************************** ', cleanToken);

    const decoded = jwt.verify(cleanToken, process.env.SECRET_KEY as string) as JwtPayload;
    console.log('----------------------------------------> ', decoded);
    
    if (!decoded) {
      throw new Error('Invalid token');
    }
    
    const user = await prisma.user.findUnique({
      where: {
        userId: parseInt(decoded.userId,10),
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
export const withAuth = (
  handler: (request: NextRequest, user: User, params?: Record<string, string>) => Promise<Response>
) => {
  return async (request: NextRequest, context?: { params: Record<string, string> }) => {
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
