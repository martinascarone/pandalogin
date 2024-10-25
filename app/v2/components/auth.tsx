"use client";
import { User } from "@/app/models/user";
import { UserIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthComp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      const res = await fetch("/v2/api/login?" + params, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.json().then((data: User[]) => {
        console.log(data);
        if (data.some((user) => user.username === username)) {
          router.push("/v2/dashboard");
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
        height={500}
        width={200}
        className=""
      />
      <Image
        src={"/Vector 2.png"}
        alt="logo"
        height={200}
        width={190}
        className="absolute bottom-0"
      />

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col justify-center m-auto items-center mb-10">
              <Image src={"/logo.png"} alt="logo" height={400} width={100} />
              <h1 className="text-lg text-gray-900">Sign in to your accout</h1>
            </div>
            <form className="space-y-4 md:space-y-6">
              <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                <UserIcon className="h-8 text-gray-500 ml-2"></UserIcon>
                <input
                  name="email"
                  id="email"
                  className="bg-white text-gray-900 outline-none block w-full p-2.5 "
                  placeholder="••••••••"
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
                  placeholder="Username"
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
                  Forgot passsword!
                </a>
              </div>
              <div className="flex flex-row justify-end mt-20">
                <button
                  type="button"
                  className="flex flex-row w-fit items-center content-center"
                  onClick={handleSubmit}
                >
                  <h2 className="text-xl w-40 font-bold">Siign in</h2>
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
                Dont you habe an acount?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Create
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0">
        VERSION 2
    </div>
    </div>
  );
};
export default AuthComp;
