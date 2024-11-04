"use client";
import { User } from "@/app/models/user";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavBar from "./NavBar";

const NewPasswordForm = (props:{user:User}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnNewPassword] = useState("");
  const [newPasswordRepeat, setnNewPasswordRepeat] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (oldPassword && newPassword && newPasswordRepeat) {
        try {
            const resp = await fetch("/v3/api/new-password", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    _id: props.user._id,
                    username: props.user.username,
                    oldPassword, 
                    newPassword, 
                    newPasswordRepeat 
                }),
              });
            resp.json().then((data: {
                    acknowledged: boolean;
                    insertedId: string;
                  }
            ) => {
                console.log(data);
                if (data?.insertedId) {
                    alert("User created successfully");
                    router.push("/v3/dashboard");
                } else {
                    alert("Login failed");
                }
            }).catch((error) => {
                console.error("An error occurred while creating the user", error);
            });

        } catch (error) {
            console.error("An error occurred while creating the user", error);
        }
    }
  };

  return (
      <div>

          <div className="flex flex-col items-center justify-center h-screen">
              <div className="w-96">
                  <div className="flex justify-center">
                      <Image src="/logo.png" width={100} height={100} alt="panda-logo"/>
                  </div>
                  <h1 className="text-2xl font-bold text-center mt-4">New Password</h1>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                      <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                          <LockClosedIcon className="h-8 text-gray-500 ml-2"></LockClosedIcon>
                          <input
                              type="password"
                              name="oldPassword"
                              id="oldPassword"
                              className="bg-white text-gray-900 outline-none block w-full p-2.5"
                              placeholder="Old Password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              required={true}
                          ></input>
                      </div>
                      <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                          <LockClosedIcon className="h-8 text-gray-500 ml-2"></LockClosedIcon>
                          <input
                              type="password"
                              name="newPassword"
                              id="newPassword"
                              className="bg-white text-gray-900 outline-none block w-full p-2.5"
                              placeholder="New Password"
                              value={newPassword}
                              onChange={(e) => setnNewPassword(e.target.value)}
                              required={true}
                          ></input>
                      </div>
                      <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                          <LockClosedIcon className="h-8 text-gray-500 ml-2"></LockClosedIcon>
                          <input
                              type="password"
                              name="newPasswordRepeat"
                              id="newPasswordRepeat"
                              className="bg-white text-gray-900 outline-none block w-full p-2.5"
                              placeholder="Repeat New Password"
                              value={newPasswordRepeat}
                              onChange={(e) => setnNewPasswordRepeat(e.target.value)}
                              required={true}
                          ></input>
                      </div>
                      <button
                          type="button"
                          className="flex flex-row w-fit items-center content-center"
                          onClick={handleSubmit}
                      >
                          <h2 className="text-xl w-40 font-bold">Done</h2>
                          <div
                              className="w-full text-white
                        bg-gradient-to-r from-teal-400 to-teal-900  
                        rounded-full text-sm px-2 py-2.5 w-fit"
                          >
                              <ArrowRightIcon className="h-8 text-white ml-2"></ArrowRightIcon>
                          </div>
                      </button>
                  </form>
              </div>
          </div>
          <NavBar/>
          <div className="fixed top-0 right-0">
              VERSION 3
          </div>
      </div>
  );
};
export default NewPasswordForm;
