import { NextRequest, NextResponse } from "next/server";
import cookie from 'cookie'

export function DELETE(
    request: NextRequest
) {
    // xóa hết cookie chứa access token và refresh token ở client
    const response = NextResponse.json(
        { message: 'Log out successful' },
        { status: 200 }
    )

    response.headers.set('Set-Cookie', cookie.serialize('at', '', {
        httpOnly: true,
        expires: new Date(0), //bằng 0 có nghĩa là nó sẽ quay về năm 1970 (mặc định)
        sameSite: 'strict',
        path: ''
    }))

    response.headers.append('Set-Cookie', cookie.serialize('rt', '', {
        httpOnly: true,
        expires: new Date(0), //bằng 0 có nghĩa là nó sẽ quay về năm 1970 (mặc định)
        sameSite: 'strict',
        path: ''
    }))
    // xóa refresh token trong database
    // trả về message logout thành công
    return response
}