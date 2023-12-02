import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "./app/p/teachline-landing-page/(utils)/jwtAuth";

export async function middleware(request: NextRequest) {
  // verifing Token if available
  const token = request.cookies.get("token")?.value;
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err: Error) => {
      console.log(err);
    }));
    
  // if we fetch data from the api either for the public or non public
  if (request.nextUrl.pathname.startsWith("/p/teachline-landing-page/api")) {
    
    const privatePath = "/p/teachline-landing-page/api/pvt";
    if (request.nextUrl.pathname.startsWith(privatePath) && !verifiedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // we are returning as we want all other directories as public
    return; 
  }

  // if we request for the path related to the teachline landing page
  if (request.nextUrl.pathname.startsWith("/p/teachline-landing-page")) {
    console.log("######################### This is teachline landing page #############################");

    const publicPaths = [
      "/p/teachline-landing-page",
      "/p/teachline-landing-page/login",
      "/p/teachline-landing-page/signup"
    ];
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

    if (isPublicPath && verifiedToken)
      return NextResponse.redirect(
        new URL("/p/teachline-landing-page/dashboard", request.url)
      );

    if (!isPublicPath && !verifiedToken) return NextResponse.redirect(new URL("/p/teachline-landing-page/login", request.url));

    // returning as user can be non-verified and in that case we want to show them the public path data
    return;
  }
}

// function verifyToken(cookies: RequestCookies) {
//   const token = cookies.get("token")?.value;
//   if (token === null) return { msg: "Invalid Token", status: 401 };

//   return jwt.verify(
//     token,
//     process.env.JWT_ACCESS_TOKEN_SECRET,
//     (error: Error, data: Object) => {
//       if (error) return { msg: "Forbidden", status: 403 };
//       return { data, status: 200 };
//     }
//   );
// }

export const config = {
  matcher: ["/p/teachline-landing-page/:path*"],
};
