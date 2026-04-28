"use client";

import MainProjectItem from "@/components/dashboardItem/mainProjectItem";
import useGetAllProjects from "@/hooks/queries/useGetAllProjects";

export default function Page() {
    // zaimplementowac moliwy limit 0 - zeby pobrało wszystkie projekty
    const allProjects = useGetAllProjects("0", "100");
    const allProjectsData = allProjects.data?.data.sort((a: any, b: any) =>
        b.created_at.localeCompare(a.created_at),
    );

    return (
        <main>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {/* <MainProjectItem
                    id={allProjectsData?.[0].id}
                    name={allProjectsData?.[0].name}
                    description={allProjectsData?.[0].description}
                    tasks={allProjectsData?.[0].tasks}
                    containerClassName="col-span-1 md:col-span-2 "
                /> */}
            </div>
        </main>
    );
}
