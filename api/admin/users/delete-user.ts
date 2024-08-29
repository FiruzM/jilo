
export function deleteUser(id: number | undefined) {
    const client = useApiClient()
    return client.delete(`admin/users/${id}`).json();
}