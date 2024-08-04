import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

//trong dự án tuyệt đối ko dc lưu như này vì đây đang làm để học nên mới để vậy cho nhanh
const SECRET_KEY = 'k1v4zz-secretkey'
const jwtSecretKey = 'jwt-secret-key'

// const decryptData = (text: string) => {
//     const bytes = CryptoJS.AES.decrypt(text,SECRET_KEY)
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

export async function POST(
    request: NextRequest
) {
    const body = await request.json()
    // const {encryptUser} = body
    // const user = decryptData(encryptUser)

    const user = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    //Nếu ko tồn tại user hoặc sai password thì trả về 401
    if (user == null || user.password !== body.password) {
        return NextResponse.json(
            { message: "Username or password is incorrect" },
            { status: 401 }
        )
    }

    //Nếu oke thì generate access token và refresh token trả về cho client
    const accessToken = jwt.sign({ username: user.name }, jwtSecretKey, { expiresIn: '5m' })
    const refreshToken = jwt.sign({ username: user.name }, jwtSecretKey, { expiresIn: '10m' })

    //Lưu access token vào trong db
    const response = NextResponse.json(
        { accessToken, refreshToken },
        { status: 200 }
    )

    //Lưu access token ở cookie
    response.headers.set('Set-Cookie', cookie.serialize('at', accessToken, {
        httpOnly: true,
        maxAge: 60 * 5,
        sameSite: 'strict',
        path: ''
    }))

    response.headers.append('Set-Cookie', cookie.serialize('rt', refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: ''
    }))


    //trả về access token và refresh token cho client
    return response
}