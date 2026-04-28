import { supabase } from "@/lib/supabase/supaclient";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function POST(req: Request) {
    const reqBody = await req.json();
    if (!reqBody.user || !reqBody.password) {
        return Response.json(
            { error: "User and password are required" },
            { status: 400 },
        );
    }

    const hashedPass = await bcrypt.hash(reqBody.password, saltRounds);

    if (!hashedPass) throw new Error("nie pykło");

    try {
        const { error } = await supabase.from("user").insert({
            user: reqBody.user,
            password: hashedPass,
            created_at: new Date().toISOString(),
        });

        if (error?.code === "23505") {
            return Response.json({ error: error.message }, { status: 409 });
        }
    } catch {
        return Response.json({ error: "Error creating user" }, { status: 500 });
    }

    return new Response("acc created", { status: 200 });
}
