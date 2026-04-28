"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/supaclient";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/dist/client/link";

const formSchema = z.object({
    user: z.string().min(1, "User is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginInputs = {
    user: string;
    password: string;
};

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({ resolver: zodResolver(formSchema) });
    const session = useSession();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        await signIn(
            "credentials",
            {
                user: data.user,
                password: data.password,
            },
            { callbackUrl: "/" },
        );
    };

    return (
        <div>
            <Dialog open={true} modal={true}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent
                        showCloseButton={false}
                        className="p-12 pt-10"
                    >
                        <DialogHeader className="text-center">
                            <DialogTitle className="text-2xl font-bold">
                                Login
                            </DialogTitle>
                            <DialogDescription className="text-center">
                                Please enter your credentials to log in.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="User" className="sr-only">
                                    User
                                </Label>
                                <Input
                                    {...register("user")}
                                    placeholder="User..."
                                    id="User"
                                />
                                {errors.user && (
                                    <span className="font-light text-red-600">
                                        This field is required
                                    </span>
                                )}
                                <Label htmlFor="Password" className="sr-only">
                                    Password
                                </Label>
                                <Input
                                    {...register("password")}
                                    placeholder="Password..."
                                    id="Password"
                                />
                                {errors.password && (
                                    <span className="font-light text-red-600">
                                        This field is required
                                    </span>
                                )}
                                <Button
                                    onClick={handleSubmit(onSubmit)}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div>
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="text-blue-500 hover:underline"
                            >
                                Register here
                            </Link>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default LoginPage;
