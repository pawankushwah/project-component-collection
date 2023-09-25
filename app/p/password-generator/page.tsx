"use client";
import { useState, useEffect } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

type passwordPropertiesType = {
  lowercase?: boolean;
  uppercase?: boolean;
  number?: boolean;
  symbol?: boolean;
  excludeDuplicate?: boolean;
  includeSpaces?: boolean;
};

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [passwordProperties, setPasswordProperties] = useState({
    lowercase: true,
    uppercase: true,
    number: true,
    symbol: true,
    excludeDuplicate: false,
    includeSpaces: false,
  });
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    passwordPropertyError: { message: React.ReactNode; hasError: Boolean };
  }>({ passwordPropertyError: { message: "", hasError: false } });
  
  useEffect(()=>{
    setPassword(generatePassword(passwordProperties, 8));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleLengthChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPasswordLength(parseInt(e.target.value));
    setPassword(generatePassword(passwordProperties, parseInt(e.target.value)));
  }

  function handleCopyButtonClick() {
    navigator.clipboard.writeText(password);
  }

  function handlePasswordPropertiesClick(
    e: React.ChangeEvent<HTMLInputElement>,
    property: String
  ) {
    // managing the check and uncheck of the property and updating it
    const newPasswordProperties = { ...passwordProperties };
    newPasswordProperties[property as keyof typeof passwordProperties] =
      e.target.checked;
    setPasswordProperties(newPasswordProperties);

    // checking whether user has unchecked all the password properties or not
    const valuesSet = new Set(Object.values(newPasswordProperties));
    const newErrors = { ...errors };
    if (valuesSet.size == 1 && valuesSet.has(false)) {
      newErrors.passwordPropertyError.message = (
        <div>
          <FontAwesomeIcon icon={faTriangleExclamation} /> You have to check one
          property to generatePassword
        </div>
      );
      newErrors.passwordPropertyError.hasError = true;
      setErrors(newErrors);
    } else {
      newErrors.passwordPropertyError.hasError = false;
      setErrors(newErrors);
    }
  }

  function generatePassword(
    passwordProperties: passwordPropertiesType,
    passwordLength: number
  ) {
    // Define character sets for each category
    const characters = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      number: "0123456789",
      symbol: "!#$^&*_-+=",
      includeSpaces: " ",
    };

    // generating password chracterset
    let passwordCharacterSet = "";
    for (const property in passwordProperties) {
      if (property === "excludeDuplicate") continue;
      if (passwordProperties[property as keyof typeof passwordProperties])
        passwordCharacterSet = passwordCharacterSet.concat(
          characters[property as keyof typeof characters]
        );
    }

    // generating the password
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password = password.concat(
        passwordCharacterSet[
          Math.floor(Math.random() * passwordCharacterSet.length)
        ]
      );
    }
    return password;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="max-w-lg w-full flex flex-col space-y-5 justify-center items-center border-2 border-gray-400 p-5 rounded-lg">
          <h1 className="text-4xl">Password Generator</h1>

          {/* Password Section */}
          <div className="w-full border-2 border-gray-400 rounded-lg p-2 flex justify-between items-center text-xl">
            <span>{password}</span>
            <div>
              <FontAwesomeIcon
                icon={faCopy}
                className="hover:bg-gray-700 p-2 rounded-lg text-xl"
                onClick={handleCopyButtonClick}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="copied"
                data-tooltip-variant="light"
                data-tooltip-delay-hide="1000"
              />
              <Tooltip id="my-tooltip" openOnClick />
            </div>
          </div>

          {/* Password Length Selection section */}
          <div
            className="flex justify-center space-x-2 w-full transition-all duration-1000"
            draggable={false}
          >
            <input
              type="range"
              onChange={handleLengthChange}
              value={passwordLength}
              min={4}
              max={30}
              step={1}
              className="w-full accent-green-400"
            />
            <span className="w-full max-w-fit">Length : {passwordLength}</span>
          </div>

          {/* Password Characteristics Selection Section */}
          <div className="w-full">
            <div className="text-xl text-center">Password Properties</div>
            {errors.passwordPropertyError.hasError && (
              <div className="text-red-500">
                {errors.passwordPropertyError.message}
              </div>
            )}
            <hr className="my-3" />
            <div className="grid grid-cols-2 w-full select-none">
              <div>
                <input
                  type="checkbox"
                  id="password-lowercase"
                  checked={passwordProperties.lowercase}
                  onChange={(e) =>
                    handlePasswordPropertiesClick(e, "lowercase")
                  }
                  className="accent-red-400"
                />
                <label htmlFor="password-lowercase" className="px-4">
                  Lowercase (a-z)
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="password-uppercase"
                  checked={passwordProperties.uppercase}
                  onChange={(e) =>
                    handlePasswordPropertiesClick(e, "uppercase")
                  }
                  className="accent-red-300"
                />
                <label htmlFor="password-uppercase" className="px-4">
                  Uppercase (A-Z)
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="password-number"
                  checked={passwordProperties.number}
                  onChange={(e) => handlePasswordPropertiesClick(e, "number")}
                  className="accent-orange-400"
                />
                <label htmlFor="password-number" className="px-4">
                  Numbers (0-9)
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="password-symbol"
                  checked={passwordProperties.symbol}
                  onChange={(e) => handlePasswordPropertiesClick(e, "symbol")}
                  className="accent-orange-300"
                />
                <label htmlFor="password-symbol" className="px-4">
                  Symbols (!#$^&*_-+=)
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="password-exclude-duplicate"
                  checked={passwordProperties.excludeDuplicate}
                  onChange={(e) =>
                    handlePasswordPropertiesClick(e, "excludeDuplicate")
                  }
                  className="accent-green-300"
                />
                <label htmlFor="password-exclude-duplicate" className="px-4">
                  Exclude Duplicate
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="password-include-spaces"
                  checked={passwordProperties.includeSpaces}
                  onChange={(e) =>
                    handlePasswordPropertiesClick(e, "includeSpaces")
                  }
                  className="accent-green-400"
                />
                <label htmlFor="password-include-spaces" className="px-4">
                  Include Spaces
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              setPassword(generatePassword(passwordProperties, passwordLength))
            }
            className="p-2 w-full bg-slate-600 text-xl rounded-lg"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}
