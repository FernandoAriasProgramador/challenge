
declare function paginate(totalItems: number, currentPage?: number, pageSize?: number, maxPages?: number): paginate.Paginate;
declare namespace paginate{
  interface Paginate extends Object {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
}
}
export = paginate;
