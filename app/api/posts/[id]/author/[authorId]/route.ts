import { NextRequest, NextResponse } from "next/server";

export function GET(
    req: NextRequest,
    {params} : {params: {id: string,authorId: string}}
){
    return NextResponse.json(
        {data: {message: `Post id: ${params.id} and authorId: ${params.authorId}`}},
        {status: 200,statusText: "Hihihi"}
    )
}