"use client";
import { User } from "@/app/models/user";
import { UserIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveAuthStateInLocalStorage } from "../isLoggedIn";

const AuthComp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      const res = await fetch("/v3/api/login?" + params, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.json().then((data: User[]) => {
        console.log(data);
        if (data.some((user) => user.username === username)) {
          saveAuthStateInLocalStorage(data[0]);
          router.push("/v3/dashboard");
        } else {
          alert("Login failed");
        }
      }
      ).catch((error) => {
        console.error("An error occurred while log in the user", error);
        alert("Login failed");
      });
    //  router.push("/dashboard");
    } catch (error) {
      console.error("An error occurred while log in the user", error);
      alert("Login failed");
    }
  };

  return (
    <div>
      <Image
        src={"/Vector 1.png"}
        alt="logo"
        height={300}
        width={200}
        className=""
      />
      <Image
        src={"/Vector 2.png"}
        alt="logo"
        height={200}
        width={90}
        className="absolute bottom-0"
      />

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col justify-center m-auto items-center mb-10">
              <Image src={"/logo.png"} alt="logo" height={300} width={200} />
              <h1 className="text-lg text-gray-900">Sign in to your account</h1>
            </div>
            <form className="space-y-4 md:space-y-6">
              <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                <UserIcon className="h-8 text-gray-500 ml-2"></UserIcon>
                <input
                  name="username"
                  id="username"
                  className="bg-white text-gray-900 outline-none block w-full p-2.5 "
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={false}
                ></input>
              </div>
              <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                <LockClosedIcon className="h-8 text-gray-500 ml-2"></LockClosedIcon>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-white text-gray-900 outline-none block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex flex-row justify-end mt-20">
                <button
                  type="button"
                  className="flex flex-row w-fit items-center content-center"
                  onClick={handleSubmit}
                >
                  <h2 className="text-xl w-40 font-bold">Sign in</h2>
                  <div
                    className="w-full text-white 
                        bg-gradient-to-r from-teal-400 to-teal-900  
                        rounded-full text-sm px-2 py-2.5 w-fit"
                  >
                    <ArrowRightIcon className="h-8 text-white ml-2"></ArrowRightIcon>
                  </div>
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 mb-50">
                Don&#39;t you have an account?
                <Link
                  href="/v3/create"
                  className="font-medium text-primary-600 hover:underline ml-1"
                >
                  Create
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0">
          VERSION 3
      </div>
    </div>
  );
};
export default AuthComp;
