import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', 'verified', {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, path: '/',
    });
    return response;
  }
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}

export async function GET(req: Request) {
  const response = NextResponse.redirect(new URL('/', req.url));
  response.cookies.set('admin_auth', '', { maxAge: 0, path: '/' });
  return response;
}