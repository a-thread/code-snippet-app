export interface GistFile {
    filename: string;
    type: string;
    language: string | null;
    raw_url: string;
    size: number;
}

export interface GistOwner {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
}

export interface Gist {
    id: string;
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    public: boolean;
    files: { [key: string]: GistFile };
    owner: GistOwner;

    isSelected?: boolean;
}
