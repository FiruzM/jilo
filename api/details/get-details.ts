import { client } from "../client";
import type { definitions } from "../v1";

export function getDetails() {
    return client.get("app/details/all").json<{payload:{"Categories": definitions["models.Categories"][], "Brands": definitions["models.Brands"][], "Subcategories": definitions["models.Subcategories"][] }}>();
}