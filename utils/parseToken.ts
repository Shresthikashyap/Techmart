// interface TokenPayload {
//     id: string;
//     email: string;
//     role: string;
//     exp: number;
//     [key: string]: unknown;//any; // for anything extra

// }

//Record<string, unknown>: “This is an object, but I’m not 100% sure what’s in it... yet.”
export function parseJwt(token: string): Record<string, unknown> { //TokenPayload {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
}
