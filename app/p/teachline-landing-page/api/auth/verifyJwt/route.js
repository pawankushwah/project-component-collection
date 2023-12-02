import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    let body = await req.json();
    const token = body.token;
    if(token === null) return NextResponse.json({ msg:"Invalid Token" }, {status: 401});

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, data) => {
        if(error) res.status(403);
        return NextResponse.json({data})
    })
}