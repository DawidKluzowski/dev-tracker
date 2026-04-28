import { supabase } from "@/lib/supabase/supaclient";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const { data } = await supabase.from("projects").select("*").eq("id", id);

    if (!data) {
        return Response.json({ error: "project not found" }, { status: 404 });
    }

    return Response.json({ data }, { status: 200 });
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const reqBody = await request.json();

    try {
        const { error } = await supabase
            .from("projects")
            .update({
                project_name: reqBody.projectName,
                status: reqBody.status,
            })
            .eq("id", id);

        if (error) {
            return Response.json(
                { error: "something went wrong" },
                { status: 400 },
            );
        }

        return Response.json(
            { status: 200 },
            { statusText: "update successful" },
        );
    } catch {
        return Response.json(
            {
                error: "something went wrong",
            },
            { status: 400 },
        );
    }
}
