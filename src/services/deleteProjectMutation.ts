const deleteProject = async (projectId: string) => {
    await fetch("/api/project", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
    });
};

export default deleteProject;
