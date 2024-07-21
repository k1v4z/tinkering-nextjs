import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest
) {
    console.log(headers().get('authorization'));
    return NextResponse.json(
        { data: "12345" },
        { status: 200, statusText: "Test Header Authorization" }
    )
}