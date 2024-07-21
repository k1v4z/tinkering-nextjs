import { deleteError } from "@/app/lib/customerror/CustomErr";
import userValidateCheck from "@/app/lib/zod-schema/UserSchema";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } } //object destructuring
) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    return NextResponse.json(
        { user },
        { status: 200 }
    )
}

//UPDATE USER BY ID
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const body = await request.json()
    if (!userValidateCheck(body).success) {
        return NextResponse.json(
            { error: userValidateCheck(body).error },
            { status: 200 }
        )
    }else{
        try {
            const updateUser = await prisma.user.update({
                where: {
                    id: parseInt(params.id)
                },
                data: body
            })

            return NextResponse.json({
                updateUser, message: "Update successful"
            })
        } catch (err) {
            return NextResponse.json(
                { errCode: deleteError.ErrorCode, message: deleteError.Message }
            )
        }
    }
}

export async function DELETE(
    request: NextRequest,
    {params}: {params: {id: string}}
){

    try{
        const deleteUser = await prisma.user.delete({
            where: {
                id: parseInt(params.id)
            },
        })

        return NextResponse.json(
            { deleteUser, message: "Delete user successful" },  
            { status: 200, statusText: "Delete successful" }
        )
    }catch(err){
        return NextResponse.json(
            {errCode: deleteError.ErrorCode,message: deleteError.Message}
        )
    }
}