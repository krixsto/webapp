export type Pagination = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
};

export type Result<T> = 
| {
    success: true;
    data: T;
    pagination?: Pagination;
}
|{
    success: false;
    error: {
        code: string;
        message: string;
    };
};