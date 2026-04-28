const getAllProjects = async (page: string, limit: string) => {
    const response = await fetch(`/api/project?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
};

export default getAllProjects;
