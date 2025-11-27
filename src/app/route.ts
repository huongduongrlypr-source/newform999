import { NextResponse } from 'next/server';

const GET = async () => {
    return NextResponse.json({ 
        success: true,
        message: 'API is working',
        timestamp: new Date().toISOString()
    }, { status: 200 });
};

export { GET };
