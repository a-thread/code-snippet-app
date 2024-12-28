import { GistList } from "../../../models/gists";

export interface GistTableVm {
    sortedGists: GistList[];
    sortColumn: keyof GistList | null;
    sortOrder: 'asc' | 'desc';
}