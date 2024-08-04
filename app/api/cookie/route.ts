import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie'
import { headers } from "next/headers";

export async function GET(
    request: NextRequest
) {
    const at_cookies = request.cookies.get('at')
    
    const accessToken = at_cookies?.value

    if(accessToken){
        return NextResponse.json(
            {message: "Cookie existed"},
            {status: 200}
        )
    }
    
    return NextResponse.json(
        { message: "Cookie don't existed" },
        { status: 200 }
    )
}