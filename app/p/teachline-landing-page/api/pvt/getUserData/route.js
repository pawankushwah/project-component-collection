import { dbConnect, model } from "../../../(utils)/models";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req){
    const baseUrl = req.headers.get("origin");
    const headerList = req.cookies.get("token").value;
    let jwtVerifyResult = verifyToken(headerList);
    console.log("Hello World!");
    
    if(jwtVerifyResult.status === 200){
        console.log("Hello World!");
        await dbConnect();
        let usersModel = await model("users");
        let response = await usersModel.find({username: jwtVerifyResult.data.username});
        if(response.length == 1) return NextResponse.json(response[0]);
        const returnResponse = NextResponse.redirect(new URL("/auth/login", baseUrl));
        returnResponse.cookies.set("token", "", {expires:new Date(0)});
        return returnResponse;
    }
    else {
        const returnResponse = NextResponse.redirect(new URL("/auth/login", baseUrl));
        returnResponse.cookies.set("token", "", {expires:new Date(0)});
        return returnResponse;
    }
}

// to be deleted after middleware has built
export function verifyToken(token){
    // const authHeader = headers.get("authorization");
    if(token === null) return {msg: "Invalid Token", status:401};

    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, data) => {
        if(error) return {msg: "Forbidden", status:403};
        return {data, status: 200};
    })
}