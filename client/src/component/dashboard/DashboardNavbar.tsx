// 'use client';

// import { useEffect, useState } from "react";
import { Avatar } from "@heroui/react";
// import { Sun, Moon } from "@gravity-ui/icons";

const DashboardNavbar = ({ user }: { user: any }) => {

    // console.log(user,"Navbar");

   

    return (
        <div className="flex items-center justify-between">
            {/* Left */}
            <div>
                <h2 className="text-xl font-semibold">
                    Dashboard
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome back
                    {/* {user?.name || "user"} */}
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* {user && ( */}
                    <div className="flex items-center gap-2">
                        <Avatar size="sm">
                            <Avatar.Image
                                src={user?.image || '/user.jpg'}
                                alt={user?.name}
                            />
                            <Avatar.Fallback>
                                {user?.name?.charAt(0)}
                            </Avatar.Fallback>
                        </Avatar>

                        <div className="hidden md:block">
                            <p className="text-sm font-medium">
                                {user?.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                {user?.role}
                            </p>
                        </div>
                    </div>
                {/* // )} */}
            </div>
        </div>
    );
};

export default DashboardNavbar;