import { dbConnect, model } from "./models";

const jwt = require("jsonwebtoken");

export async function generateAccessToken(userData, hasExpiredToken = false) {
  // if the user is logining up
  const newToken = jwt.sign(userData, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  if (!hasExpiredToken) return newToken;

  // if user has logined in but want to extend the expiration time
  // we will generate new token with new expiration time 
  // we will change the database by replacing access token with newAccessToken and putting the currentAccesToken into the blacklist
  const tokenExp = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET).exp;
  const username = userData.username;
  await dbConnect();
  const sessionTokenModel = await model("sessionToken");
  const currentSessionDataOfUser = await sessionTokenModel.find({ username });
  const currentBlacklist = await currentSessionDataOfUser.blackListedToken;
  const currentAccessToken = await currentSessionDataOfUser.accessToken;
  const result = await sessionTokenModel.updateOne(
    { username },
    {
      $set: {
        accessToken: { token: newToken, exp: tokenExp },
        blackListedToken: [...currentBlacklist, currentAccessToken],
      },
    }
  );
  console.log(result)
  return token;
}

export async function generateRefreshToken(userData) {
  // it simply generates the new refreshtoken and put it into the database with its schema
  const token = jwt.sign(
    { username: userData.username },
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  const accessToken = generateAccessTokenWithNoExpiration(userData);
  await dbConnect();
  const sessionTokenModel = await model("sessionToken");
  const result = await sessionTokenModel.insertMany({
    username: userData.username,
    accessToken: { accessToken, exp: userData.exp },
    refreshToken: token,
    blackListedToken: [],
  });
  return token;
}

function generateAccessTokenWithNoExpiration(userData){
  return jwt.sign(userData, process.env.JWT_ACCESS_TOKEN_SECRET);
}

export async function deleteToken(userData){
  await dbConnect();
  const sessionTokenModel = await model("sessionToken");
  const result = sessionTokenModel.deleteMany({username: userData.username});
  return result;
}

export function verifyToken(req){
  const token = req.cookies.get("token").value;
  if(token === null) return {msg: "Invalid Token", status:401};

  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, data) => {
      if(error) return {msg: "Forbidden", status:403};
      return {data, status: 200};
  })
}