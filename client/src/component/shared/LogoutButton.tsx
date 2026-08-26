'use client';

import { useAuth } from "@/lib/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        logout();
        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10"
            >
            <BiLogOut className="size-5" />
            Logout
        </button>
    );
};

export default LogoutButton;