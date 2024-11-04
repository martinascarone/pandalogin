"use client"
import { useRouter } from "next/navigation";
import NewPasswordForm from "../components/NewPasswordForm";
import { getUserStatus } from "../isLoggedIn";
import { User } from "@/app/models/user";

const NewPasswordPage = () => {
    const user = getUserStatus();
    const router = useRouter();
    if(!user) {
        router.push("/v3");
    }
    return (
        <NewPasswordForm user={user as User}/>
    );
};

export default NewPasswordPage;