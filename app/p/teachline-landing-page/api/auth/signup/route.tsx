import { dbConnect, model } from "../../../(utils)/models";
import { generateAccessToken, generateRefreshToken } from "../../../(utils)/jwtToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  let data = await req.json();
  let newErrors = validateData(data);
  if (Object.keys(newErrors).length !== 0) return NextResponse.json(newErrors);

  await dbConnect();
  const usersModel = await model("users");
  const isUsernameAvailable = await usersModel.find({
    username: data.username,
  });
  if (isUsernameAvailable.length > 0) return NextResponse.json({isUsernameAvailable: false});

  if (Object.keys(newErrors).length === 0) {
    delete data.confirmPassword;
    delete data.showEmailField;
    delete data.showMobileField;
    let response = await usersModel.insertMany(data);
    console.log(response);

    const jwtToken = await generateAccessToken({ username: response[0].username });
    const tokenData = jwt.verify(jwtToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    const jwtRefreshToken = await generateRefreshToken({
      username: response[0].username,
      exp: tokenData.exp,
      iat: tokenData.iat
    });

    return NextResponse.json({ redirect: true, token: jwtToken, refreshToken:jwtRefreshToken, userId: response[0]._id, url: "dashboard" });
  } else return NextResponse.json({msg: "something went Wrong"});
}

function validateData(data) {
  const errors = {};
  const passwordRegex = /^(?=.*[@#$&*!])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const mobileRegex = /^\d{10}$/;

  if (!data) return { err: "validation error" };

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (data.showEmailField) {
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!data.email.match(emailRegex)) {
      errors.email = "Invalid email format";
    }
  }

  if (data.showMobileField) {
    if (!data.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!data.mobile.match(mobileRegex)) {
      errors.mobile = "Invalid mobile number format";
    }
  }

  if (!data.showEmailField && !data.showMobileField)
    [(errors.emailOrMobile = "Either Email or Mobile is required")];

  if (!data.username.trim()) errors.username = "username is required";

  if (!data.password) {
    errors.password = "Password is required";
  } else if (!data.password.match(passwordRegex)) {
    errors.password = "Fullfill all the conditions";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
