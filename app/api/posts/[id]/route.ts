import { NextRequest, NextResponse } from "next/server";

export function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return NextResponse.json(
        { data: { message: `Get post by id: ${params.id}` } },
        { status: 200, statusText: "Get post successful" }
    )
}

export function PUT(
    request: NextRequest,
    {params}: {params: {id: string}}
){
    return NextResponse.json(
        {data: {message: `Update post by id: ${params.id}`}},
        {status: 200, statusText: "Update Post Successful"}
    )
}