import { GistList } from "../../../shared/models/gists";

export interface GistTableVm {
    sortedGists: GistList[];
    sortColumn: keyof GistList | null;
    sortOrder: 'asc' | 'desc';
}