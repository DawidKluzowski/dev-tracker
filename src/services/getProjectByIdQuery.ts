export async function getProjectByIdQuery(id: string) {
    const response = await fetch(`/api/project/${id}`);

    if (!response.ok) throw new Error("Błąd pobierania");
    return response.json();
}
