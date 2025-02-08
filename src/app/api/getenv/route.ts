import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = process.env.NEXT_AUTH_SECRET;

  return NextResponse.json(
    {
      env: secret || "Environment variable not found",
    },
    { status: 200 }
  );
}