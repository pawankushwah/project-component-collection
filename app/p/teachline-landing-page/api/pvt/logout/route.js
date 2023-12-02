import { NextResponse } from "next/server";
import { deleteToken, verifyToken } from "../../../(utils)/jwtToken";

export async function DELETE(req){
    const jwtVerifyResult = verifyToken(req);
    if(jwtVerifyResult.status !== 200) return NextResponse.json(jwtVerifyResult.msg, {status: jwtVerifyResult.status})

    // now we will delete the user Session
    const msg = await deleteToken({username: jwtVerifyResult.data.username});
    const responseResult = NextResponse.json(msg, {status:200});
    responseResult.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})
    return responseResult;
}