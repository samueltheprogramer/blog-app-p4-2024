"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const cookies = new Cookies();

export default function Auth() {
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-tocken", result.user.refreshToken);
      if (result) {
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center  bg-gradient-to-b from-green-500 to-red-500 gap-6">
      <h1 className="text-md font-extrabold ">Welcome To Movie BlogApp </h1>
      <h1 className="lg:text-4xl text-xl font-extrabold text-white">
        Sign In with Google to Continue
      </h1>
      <button
        variant="contained"
        sx={{ bgcolor: "red" }}
        onClick={handleSignInWithGoogle}
        className="lg:text-2xl text-lg rounded-3xl btn text-white bg-black "
      >
        Sign In With Google
      </button>
    </div>
  );
}
