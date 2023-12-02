import { NextRequest, NextResponse } from "next/server";
import { dbConnect, model } from "@/utils/models";

export async function GET(req: NextRequest) {
  
  let coursesNumber = [];
  try{
    await dbConnect();
    const coursesModel = await model("courses");
    coursesNumber = await coursesModel.find({});
  } catch (error) {
    console.log("Error: ", error);
    if (coursesNumber.length !== 1) return NextResponse.json({ error: true, msg: "Unable To get Data" });
  }
  console.log(coursesNumber.length, coursesNumber);

  return NextResponse.json(coursesNumber, { status: 200 });
}
