"use client";

import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Logo from "@/assets/logo.svg";

const authComponents = [
    {
        title: "Log out",
        href: "/register",
    },
];

function Navbar() {
    const session = useSession();

    return (
        <NavigationMenu className="w-screen">
            <NavigationMenuList className="w-full justify-between">
                <NavigationMenuItem render={<Link href="/" />}>
                    <img src={Logo.src} alt="Logo" />
                </NavigationMenuItem>
                <div className="flex gap-8">
                    <NavigationMenuItem render={<Link href="/" />}>
                        Dashboard
                    </NavigationMenuItem>{" "}
                    <NavigationMenuItem render={<Link href="/projects" />}>
                        Projects
                    </NavigationMenuItem>{" "}
                    <NavigationMenuItem render={<Link href="/notes" />}>
                        Notes
                    </NavigationMenuItem>
                </div>
                {session.status === "authenticated" ? (
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            {session?.data?.user?.userName || "User"}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="w-96">
                                {authComponents.map((component) => (
                                    <li key={component.title}>
                                        <NavigationMenuLink
                                            render={
                                                <Link href={component.href} />
                                            }
                                            className="p-3"
                                            onClick={() => signOut()}
                                        >
                                            {component.title}
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ) : (
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            render={<Link href="/login" />}
                            className={
                                (navigationMenuTriggerStyle(), "cursor-pointer")
                            }
                        >
                            Log in
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default Navbar;
