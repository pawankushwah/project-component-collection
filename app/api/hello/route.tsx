import { NextRequest, NextResponse } from "next/server"

export function GET(req : NextRequest){
  return NextResponse.json(["Pawan Kushwah", "BCA 3rd sem"], {status: 200});
}