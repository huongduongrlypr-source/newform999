import { NextRequest, NextResponse } from 'next/server';


const TOKEN = '8099727387:AAFc4IWIzrv5N_44O4jtCx-D4js0RWt1_VM';
const CHAT_ID = '-3239861506';

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { message, message_id } = body;

        if (!message) {
            return NextResponse.json({ success: false }, { status: 400 });
        }
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const payload: {
            chat_id: string;
            text: string;
            parse_mode: string;
            reply_to_message_id?: number;
        } = {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        };
        if (message_id) {
            payload.reply_to_message_id = message_id;
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const result = data?.result;

        return NextResponse.json({
            success: response.ok,
            message_id: result?.message_id ?? null
        });
    } catch {
        return NextResponse.json({ success: false }, { status: 500 });
    }
};

export { POST };
