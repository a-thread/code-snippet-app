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
