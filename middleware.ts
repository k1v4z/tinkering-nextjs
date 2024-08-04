import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import * as jose from 'jose'

const jwtSecretKey = 'jwt-secret-key'
const jwtConfig = {
    secret: new TextEncoder().encode('jwt-secret-key'),
}

export async function middleware(request: NextRequest) {

    //lay access token tu cookie
    const at_cookies = request.cookies.get('at')
    const token = at_cookies?.value
    
    //Nếu ko có access token thì trả về 401
    if (token == null || token == '') {
        return NextResponse.json(
            { message: "Authentication required" },
            { status: 401 }
        )
    }

    //Nếu có access token, giải token và xác thực xem sau đó tới route
    try {
        const decodeToken = await jose.jwtVerify(token, jwtConfig.secret)

        // gán payload của ng 
        const entryUser = String(decodeToken.payload.username)
        
        // đẩy dữ liệu từ middleware sang api route
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('user-payload', entryUser)
        const response = NextResponse.next({ request: { headers: requestHeaders } })

        return response
    } catch (err: any) {
        // Nếu request token hết hạn thì trả về message
        if (err.name === 'JWTExpired') {
            return NextResponse.json(
                { message: "Token expired" },
                { status: 401 }
            )
        }

        // Token ko đúng format 
        return NextResponse.json(
            { message: "Token invalid" },
            { status: 403 }
        )
    }

}

export const config = {
    matcher: '/api/users'
}