import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class SalesReportModel {
    public brcode?: string;
    public date?: string;  
    public sale: number;
    public cash: number;
    public chq: number;
    public cc: number;
    public gp: number;
    public deposit: number;
    public bank: number;
    public transfer: number;
    public axisCC: number;
    public rate24Kt: number;
    public rate22K: number;
    public rate18k: number;
    public mthCumulative: number;
    public status: boolean;

    constructor() {
        this.brcode = '';
        this.date = '';
        this.sale = 0;
        this.cash = 0;
        this.chq = 0;
        this.cc = 0;
        this.gp = 0;
        this.deposit = 0;
        this.bank = 0;
        this.transfer = 0;
        this.axisCC = 0;
        this.rate24Kt = 0;
        this.rate22K = 0;
        this.rate18k = 0;
        this.mthCumulative = 0;
        this.status = false;
    }
}


export class SalesReportViewModel extends CommonModel {
    public salesReportModel: SalesReportModel;
    barCode: string;
    fromDate: Date;
    toDate: Date;


    constructor() {
        super();
        this.salesReportModel;
    }
}

export class SalesReportListViewModel extends CommonModel {
    public salesReportList: SalesReportModel[];

    constructor() {
        super();
        this.salesReportList = [];
    }
}

