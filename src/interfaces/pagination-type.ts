export interface ILaravelPagination {
    last_page: number;
    last_page_url: string;
    from: number;
    first_page_url: string;
    current_page: number;
    next_page_url?: string;
    prev_page_url?: string;
    to: number;
    total: number;
    path: string;
    links: { url: string, label: string, active: boolean }[];
}