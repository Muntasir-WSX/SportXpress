import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';


const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "rentnest_access_test_secret";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const AUTH_ROUTES = [
        '/login',
        '/register',
    ];

    const PUBLIC_ROUTES = [
        '/',
        '/home',
        '/properties', 
        '/about',
    ];

    const accessToken = request.cookies.get('accessToken')?.value;

    let userRole = null;
    let isValidToken = false;

    if (accessToken) {
        try {
           
            const decoded = jwt.verify(accessToken, ACCESS_SECRET) as JwtPayload;
            if (decoded && decoded.role) {
                userRole = decoded.role;
                isValidToken = true;
            }
        } catch (error) {
            
            isValidToken = false;
            userRole = null;
        }
    }

   
    if (isValidToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'TENANT') {
            return NextResponse.redirect(new URL('/tenantdashboard', request.url));
        } else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        } else if (userRole === 'LANDLORD') {
            return NextResponse.redirect(new URL('/Landlord-Dashboard', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));

    
    if (!isValidToken && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

  
    if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    if (pathname.startsWith("/Landlord-Dashboard") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    if (pathname.startsWith("/tenantdashboard") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};