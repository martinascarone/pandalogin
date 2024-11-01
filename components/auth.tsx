import { UserIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";

const AuthComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Convertir nombre de usuario a minúsculas antes de enviarlo
    const username = email.toLowerCase();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Inicio de sesión exitoso", data);
      } else {
        console.log("Error en inicio de sesión:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
    }
  };

  return (
    <div>
      <Image src={"/Vector 1.png"} alt="logo" height={500} width={200} className="" />
      <Image src={"/Vector 2.png"} alt="logo" height={200} width={190} className="absolute bottom-0" />
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col justify-center m-auto items-center mb-10">
              <Image src={"/logo.png"} alt="logo" height={400} width={100} />
              <h1 className="text-lg text-gray-900">Sign in to your account</h1>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                <UserIcon className="h-8 text-gray-500 ml-2" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-white text-gray-900 outline-none block w-full p-2.5"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-row shadow-xl items-center p-2 rounded-full">
                <LockClosedIcon className="h-8 text-gray-500 ml-2" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-white text-gray-900 outline-none block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm font-medium text-gray-500 hover:underline">
                  Forgot password!
                </a>
              </div>
              <div className="flex flex-row justify-end mt-20">
                <button type="submit" className="flex flex-row w-fit items-center content-center">
                  <h2 className="text-xl w-40 font-bold">Sign in</h2>
                  <div className="w-full text-white bg-gradient-to-r from-teal-400 to-teal-900 rounded-full text-sm px-2 py-2.5 w-fit">
                    <ArrowRightIcon className="text-white ml-1" />
                  </div>
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 mb-50">
                Don’t have an account?{" "}
                <a href="#" className="font-medium text-primary-600 hover:underline">
                  Create
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComp;