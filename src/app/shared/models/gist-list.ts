import { BaseGist } from "./base-gist";

export interface GistListFile {
    filename: string;
    type: string;
    language: string | null;
    raw_url: string;
    size: number;
}



export interface GistList extends BaseGist {
    files: { [key: string]: GistListFile };

    isSelected?: boolean;
}
