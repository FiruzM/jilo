import { client } from "~/api/client";
import type { definitions } from "~/api/v1";

export function getUsers() {
    return client.get("admin/users").json<{ payload: definitions["models.AddUserParams"][], total: number }>();
}