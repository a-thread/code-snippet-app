import { Gist } from "../../../models/gists";

export interface GistTableVm {
    sortedGists: Gist[];
    sortColumn: keyof Gist | null;
    sortOrder: 'asc' | 'desc';
}