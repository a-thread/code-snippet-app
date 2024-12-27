export interface GistDto {
    id?: string;
    description: string;
    files: {
        [key: string]: {
            content: string;
        }
    }

}