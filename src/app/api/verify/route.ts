import { NextResponse } from 'next/server';

export const POST = async () => {
    try {
        const token = Date.now();
        const response = NextResponse.json({ 
            success: true,
            message: 'Verified successfully'
        }, { status: 200 });
        
        response.cookies.set('token', `${token}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 300,
            path: '/',
            sameSite: 'lax'
        });
        
        return response;
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
};
