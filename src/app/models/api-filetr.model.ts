export class ApiFiletr {
  constructor(
    public fromDate: string | Date,
    public toDate: string | Date,
    public top?: number,
    public branch?: string,
    public finyr?: string
  ) {}
}
export class ApiMonthFilter {
  constructor(
    public brcode?: string | null,
    public saleMonth?: string | null,
    public top?: number,
    public finyr?: string
  ) {}
}
