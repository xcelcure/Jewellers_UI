import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class DailyNoteModel {
    public brcode:	string;
    public cmdate:	string;
    public memono:	string;
    public vno:	string;
    public cash:	number;
    public dd:	number;
    public cc:	number;
    public customer:	number;
    public gv:	number;
    public upi:	number;
    public description:	string;
    public totamount:	number;
    public vno_credit:	number;
    public description_credit:	string;
    public cash_credit:	number;
    public chq_credit:	number;
    public totamount_credit:	number;
    public rowID:	number;

constructor(){
    this.brcode='';
    this.cmdate='';
    this.memono='';
    this.vno='';
    this.cash=0;
    this.dd=0;
    this.cc=0;
    this.customer=0;
    this.gv=0;
    this.upi=0;
    this.description='';
    this.totamount=0;
    this.vno_credit=0;
    this.description_credit='';
    this.cash_credit=0;
    this.totamount_credit=0;
    this.rowID=0;

    
}
}
export class DailyNoteViewModels extends CommonModel
{
   public dailyNoteModel: DailyNoteModel;
    barCode:	string;
    fromDate:	Date;
    toDate:	Date;


   constructor()
   {
       super();
       this.dailyNoteModel;
   }
}

export class DailyNoteModelsViewModel extends CommonModel
{
   public dailyNoteModels: DailyNoteModel[];

   constructor()
   {
       super();
       this.dailyNoteModels = [];
   }
}

