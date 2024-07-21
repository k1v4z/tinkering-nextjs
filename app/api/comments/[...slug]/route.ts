import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    {params}: {params: {slug: string}}
){
    const a = await request.json();
    console.log(a);
    
    return NextResponse.json(
        {message: `slug = ${params.slug}`, data: a}
    )
}