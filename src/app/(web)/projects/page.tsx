"use client";

import ProjectModal from "@/components/projectModal/projectModal";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useRemoveProject from "@/hooks/mutations/useRemoveProject";
import useGetAllProjects from "@/hooks/queries/useGetAllProjects";
import { Tables } from "@/types/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback, useState } from "react";

// dodac paginacje i sortowanie

const PAGINATION_OFFSET = 7;

function Projects() {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const mutation = useRemoveProject();
    const pageParam = searchParams.get("page");

    const { data: projects } = useGetAllProjects(
        pageParam ?? "0",
        PAGINATION_OFFSET.toString(),
    );
    const router = useRouter();

    const createQueryString = useCallback(
        (page: number, limit: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            params.set("limit", limit.toString());

            return params.toString();
        },
        [searchParams],
    );

    const handleDelete = (data: string) => {
        mutation.mutate(data);
    };

    return (
        <>
            <div className="px-16 w-full">
                <Table>
                    <TableCaption>A list of your recent projects.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3 font-semibold">
                                Project Name
                            </TableHead>
                            <TableHead className="w-24">Status</TableHead>
                            <TableHead className="text-right">Tasks</TableHead>
                            <TableHead className="text-right">
                                Time updated
                            </TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects?.data?.map((project: Tables<"projects">) => {
                            return (
                                <TableRow key={project.id}>
                                    <TableCell className="w-1/3 font-semibold">
                                        {project.project_name}
                                    </TableCell>
                                    <TableCell className="w-24">
                                        {project.status}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {/* ADD PROJECT COUNT WHEN TABLE STRUCTURE IS UPDATED */}
                                        {0}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {new Date(
                                            project.updated_at,
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/projects/${project.id}`}>
                                            <Button>Edit</Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(project.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Pagination>
                    <PaginationContent>
                        {Array.from({
                            length: projects?.totalPages || 0,
                        }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const queryString = createQueryString(
                                            index,
                                            PAGINATION_OFFSET,
                                        );
                                        router.push(`/projects?${queryString}`);
                                    }}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
                <Button onClick={() => setIsOpen(true)}>Add New Project</Button>
            </div>
            <ProjectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

export default Projects;

// ui zeby jakas to wygladalo
// login i register powinny nie byc dialogami
// glowna strona to dashboard
// na dashboardzie lista do projektow
// mozliwosc dodawania/usuwania projektow
// sama lista bez szczegółów
