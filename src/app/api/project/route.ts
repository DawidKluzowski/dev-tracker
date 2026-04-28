import { supabase } from "@/lib/supabase/supaclient";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const pageParam = Number(request?.nextUrl.searchParams.get("page")) || 0;
    const limitParam = Number(request?.nextUrl.searchParams.get("limit")) || 10;
    const offset = pageParam * limitParam;
    const { data, count } = await supabase
        .from("projects")
        .select("*", { count: "exact" })
        .order("updated_at", { ascending: true })
        .range(offset, offset + limitParam - 1);

    const totalPages = Math.ceil((count ?? 0) / limitParam);

    return Response.json({ data, totalPages }, { status: 200 });
}

export async function POST(request: Request) {
    const reqBody = await request.json();

    if (!reqBody.projectName) {
        return Response.json(
            { error: "Project name are required" },
            { status: 400 },
        );
    }

    try {
        const { error } = await supabase.from("projects").insert({
            project_name: reqBody.projectName,
            status: "New",
            updated_at: new Date().toISOString(),
        });

        if (error) {
            return Response.json(
                { error: "something went wrong" },
                { status: 400 },
            );
        }

        return Response.json({ success: "yes" }, { status: 200 });
    } catch {
        return Response.json(
            { error: "something went wrong 2" },
            { status: 501 },
        );
    }
}

// przeniesc to do dynamicznego routa
export async function DELETE(request: Request) {
    const reqBody = await request.json();

    if (!reqBody.projectId) {
        return Response.json(
            { error: "Project id is required" },
            { status: 400 },
        );
    }

    try {
        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", reqBody.projectId);

        if (error) {
            return Response.json(
                { error: "something went wrong" },
                { status: 400 },
            );
        }

        return Response.json({ success: "yes" }, { status: 200 });
    } catch {
        return Response.json(
            { error: "something went wrong 2" },
            { status: 501 },
        );
    }
}

// przeniesc to do dynamicznego routa
export async function PATCH(request: Request) {
    const reqBody = await request.json();
}
