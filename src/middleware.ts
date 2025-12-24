
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Only protect admin routes
    if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amlkydskhnqmhnndkaap.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbGt5ZHNraG5xbWhubmRrYWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NjQzMjMsImV4cCI6MjA4MjA0MDMyM30.5Bwzw2c0s1T2k2zVUKBjGPczsNAmN1JRWH6u0_UKsxI',
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
        if (user) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return response;
    }

    // Protect other admin pages
    if (!user) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
}
