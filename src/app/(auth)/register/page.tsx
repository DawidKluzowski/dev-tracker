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
import Link from "next/link";

const formSchema = z.object({
    user: z.string().min(1, "User is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginInputs = {
    user: string;
    password: string;
};

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({ resolver: zodResolver(formSchema) });

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        });
    };

    return (
        <div>
            <Dialog open={true} modal={true}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent showCloseButton={false}>
                        <DialogHeader className="text-center">
                            <DialogTitle>Register</DialogTitle>
                            <DialogDescription>
                                Please enter your credentials to register.
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
                                    Register
                                </Button>
                                <div>
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Login here
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default Register;
