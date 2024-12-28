interface GistOwner {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
}

export interface BaseGist {
    id: string;
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    public: boolean;
    owner: GistOwner;

    isSelected?: boolean;
}

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
