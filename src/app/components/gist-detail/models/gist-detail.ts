import { BaseGist } from "../../../models/gists";

export interface GistDetailFile {
    content: string;
    filename: string;
    language: string | null;
    raw_url: string;
    size: number;
    truncated: boolean;
    type: string;
}

export interface GistDetail extends BaseGist {
    commits_url: string;
    files: { [key: string]: GistDetailFile };
    git_pull_url: string;
    git_push_url: string;
    id: string;
    public: boolean;
}
