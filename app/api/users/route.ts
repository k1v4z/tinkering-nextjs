import UserSchema from "../../lib/zod-schema/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/db"
import userValidateCheck from "../../lib/zod-schema/UserSchema";
import { Constant } from "@/app/lib/customerror/CustomErr";
import searchParamsValidate from "@/app/lib/zod-schema/PaginationSchema";

//get all users
// export async function GET(request: NextRequest) {
//     const users = await prisma.user.findMany();

//     return NextResponse.json(
//         { data: users },
//         { status: 200, statusText: "Get all user succesful" }
//     )
// }

//add user
export async function POST(
    request: NextRequest
) {
    const body = await request.json();

    if (!userValidateCheck(body).success) {
        return NextResponse.json(
            { error: userValidateCheck(body).error },
            { status: 200 }
        )
    } else {
        // const userIsExist = await prisma.user.findUnique({
        //     where: {
        //         email: body.email
        //     }
        // })

        // if (userIsExist == null) {
        //     const user = await prisma.user.create({
        //         data: {
        //             email: body.email,
        //             name: body.name
        //         }
        //     })

        //     return NextResponse.json(
        //         { user, message: "Add successful" },
        //         { status: 201 }
        //     )
        // } else {
        //     return NextResponse.json(
        //         { error: "This email exist in db" },
        //         { status: 200 }
        //     )
        // }
        try {
            const user = await prisma.user.create({
                data: {
                    email: body.email,
                    name: body.name
                }
            })

            return NextResponse.json(
                { user, message: "Add successful" },
                { status: 201 }
            )
        } catch (error) {
            return NextResponse.json(
                { errorCode: Constant.ErrorCode, Message: Constant.Message }
            )
        }
    }
}

//delete all users
export async function DELETE(
    request: NextRequest
) {
    const users = await prisma.user.deleteMany();

    return NextResponse.json(
        { users, message: "Delete all user successful" },
        { status: 200, statusText: "Delete successful" }
    )
}

export async function GET(
    request: NextRequest
) {
    const limit: number = Number(request.nextUrl.searchParams.get('limit'));
    const page: number = Number(request.nextUrl.searchParams.get('page'));
    const sort: string | null = request.nextUrl.searchParams.get('sort');

    const searchParamProps: any = { limit, page };


    if (!searchParamsValidate(searchParamProps).success) {
        return NextResponse.json(
            { error: searchParamsValidate(searchParamProps).error },
            { status: 200 }
        )
    }

    const totalUser = await prisma.user.count();
    const totalPages: number = Math.ceil(totalUser / limit);

    if (totalPages < page) {
        return NextResponse.json(
            { message: "Page not exist" },
            { status: 400, statusText: `Get user don't successfully` }
        )
    }

    const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit
    })

    return NextResponse.json(
        { users, metadata: { totalPages, limit, totalUser }, message: "Get user successfully" },
        { status: 200, statusText: "Get user successfully" }
    )

}