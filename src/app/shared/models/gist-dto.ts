export interface GistDto {
    id?: string;
    public?: boolean;
    description: string;
    files: {
        [key: string]: {
            content: string;
        }
    }

}