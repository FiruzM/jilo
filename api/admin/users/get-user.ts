import { client } from "~/api/client";
import type { definitions } from "~/api/v1";

export function getUser(id: number) {
    return client.get("users",{
        searchParams: {
            id
        }
    }).json<{ payload: definitions["models.AddUserParams"] }>();
}