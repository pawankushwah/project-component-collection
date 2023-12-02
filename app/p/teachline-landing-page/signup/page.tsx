"use client";
import ThemeManager from "@/app/components/ThemeManager";
import Link from "next/link";
import { useRouter } from "next/navigation";
// components/SignUp.js
import React, { useState } from "react";

type errorsType = {
  isFormFilled?: boolean;
  firstname?: string;
  lastname?: string;
  email?: string;
  mobile?: string;
  emailOrMobile?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showEmailField, setShowEmailField] = useState(true);
  const [showMobileField, setShowMobileField] = useState(false);

  const [errors, setErrors] = useState<errorsType>({});
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setIsLengthValid(password.length >= 6 && password.length <= 15);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasSymbol(/[@#$&*!]/.test(password));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUsernameAvailable(true);
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;
    // Form is valid, perform signup logic here
    let usersData = { ...formData, showEmailField, showMobileField };
    console.log(usersData);
    setIsLoading(true);
    setIsUsernameAvailable(true);
    fetch("./api/auth/signup", {
      body: JSON.stringify(usersData),
      method: "POST",
    }).then((response) => {
      response.json().then((jsonData) => {
        console.log(jsonData);
        if (jsonData.token && jsonData.userId) {
          localStorage.setItem("userId", jsonData.userId);
          localStorage.setItem("token", jsonData.token);
          jsonData.refreshToken &&
            localStorage.setItem("refreshToken", jsonData.refreshToken);
          router.push(`/p/teachline-landing-page/${jsonData.url}`);
        }
        if (
          jsonData.isUsernameAvailable !== undefined &&
          !jsonData.isUsernameAvailable
        ) {
          setIsUsernameAvailable(jsonData.isUsernameAvailable);
          setErrors({ username: "username is not available" });
        } else setErrors(jsonData);
      });
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      emailOrMobile: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setIsLengthValid(false);
    setHasUppercase(false);
    setHasLowercase(false);
    setHasSymbol(false);
  };

  const validateForm = (data) => {
    const errors = {};
    const passwordRegex = /^(?=.*[@#$&*!])(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!data) return (errors.isFormFilled = false);

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (showEmailField) {
      if (!data.email.trim()) {
        errors.email = "Email is required";
      } else if (!data.email.match(emailRegex)) {
        errors.email = "Invalid email format";
      }
    }

    if (showMobileField) {
      if (!data.mobile.trim()) {
        errors.mobile = "Mobile number is required";
      } else if (!data.mobile.match(mobileRegex)) {
        errors.mobile = "Invalid mobile number format";
      }
    }

    if (!showEmailField && !showMobileField)
      [(errors.emailOrMobile = "Either Email or Mobile is required")];

    if (!data.username.trim()) {
      errors.username = "username is required";
    }

    // if (!isUsernameAvailable) {
    //   errors.username = "username is not available";
    // }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (!data.password.match(passwordRegex)) {
      errors.password = "Fullfill all the conditions";
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black dark:text-white text-black p-2">
      <div className="relative w-full max-w-xl mx-auto mt-8 p-4 bg-white text-black rounded shadow-md transition-all dark:bg-black dark:text-white border-2 border-gray-200 sm:w-full sm:max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {errors.isFormFilled && (
          <p className="text-red-500 text-sm mt-1">{errors.isFormFilled}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-x-2 md:flex-row">
            <div className="mb-4 flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="mb-4 flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-4 space-x-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="showEmailField"
                checked={showEmailField}
                onChange={() => setShowEmailField(!showEmailField)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Email
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="showMobileField"
                checked={showMobileField}
                onChange={() => setShowMobileField(!showMobileField)}
                className="dark:bg-gray-800 bg-white form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Mobile
              </span>
            </label>
            <span>
              {errors.emailOrMobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrMobile}
                </p>
              )}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:gap-x-2">
            {showEmailField && (
              <div className="mb-4 flex-1">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            )}

            {showMobileField && (
              <div className="mb-4 flex-1">
                <label htmlFor="mobile" className="block text-sm font-medium">
                  Mobile:
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username:
            </label>
            <input
              type="tel"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="flex flex-col gap-x-2 md:flex-row">
            <div className="mb-4 flex-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mb-4 flex-1">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`dark:bg-gray-800 bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="">
            {formData.password && (
              <div className="mt-2 border-2 border-gray-200 rounded-lg p-2">
                <ul className="list-none list-inside grid grid-cols-1 md:grid-cols-2">
                  <li className={`text-sm font-medium`}>
                    <span
                      className={`text-3xl font-bold ${
                        isLengthValid ? "text-green-600" : "text-gray-200"
                      }`}
                    >
                      &#x2713;
                    </span>
                    <span>Password should be between 6 and 15 characters.</span>
                  </li>
                  <li className={`text-sm font-medium`}>
                    <span
                      className={`text-3xl font-bold ${
                        hasUppercase ? "text-green-600" : "text-gray-200"
                      }`}
                    >
                      &#x2713;
                    </span>
                    <span>
                      Password should have at least one uppercase letter.
                    </span>
                  </li>
                  <li className={`text-sm font-medium`}>
                    <span
                      className={`text-3xl font-bold ${
                        hasLowercase ? "text-green-600" : "text-gray-200"
                      }`}
                    >
                      &#x2713;
                    </span>
                    <span>
                      Password should have at least one lowercase letter.
                    </span>
                  </li>
                  <li className={`text-sm font-medium`}>
                    <span
                      className={`text-3xl font-bold ${
                        hasSymbol ? "text-green-600" : "text-gray-200"
                      }`}
                    >
                      &#x2713;
                    </span>
                    <span>
                      Password should have at least one symbol (@, #, &, $, *,
                      !).
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="flex-1 flex justify-center items-center py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              <span>Sign Up</span>
              {isLoading && (
                <span className="block ml-6 w-4 h-4 border-4 border-blue-500 border-r-white rounded-full animate-spin"></span>
              )}
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-400"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="mt-3">
          Already a user?{" "}
          <Link href="./login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
