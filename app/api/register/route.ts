import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest
) {
    const body = await request.json()

    //check user đã tồn tại trong db chưa
    const user = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    //Nếu user tồn tại trong db rồi thì trả về 409 conflict
    if (user) {
        return NextResponse.json(
            { message: "User đã tồn tại" },
            { status: 409 }
        )
    } else {
        //hash password và add vào database
        const addUser = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                email: body.username + '123@gmail.com' //form register ko thiết kế chuẩn nên để tạm email như này :v
            }
        }).catch(err => NextResponse.json(
            { message: "Đăng kí không thành công" },
            { status: 500 }
        ))

        return NextResponse.json(
            { message: "Đăng kí thành công" },
            { status: 201 }
        )
    }
}