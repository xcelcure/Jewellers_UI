
import { CommonModel } from "src/app/shared/commonModel/commonModel";

export class BranchModel {
   public  brcode:string;
   public branchName:string;

   constructor(){
    this.brcode='';
    this.branchName='';
  
}
}
export class BranchViewModel extends CommonModel{
    public branchModel: BranchModel;
    constructor()
    {
        super();
        this.branchModel = new BranchModel();
    }

}


export class BranchListViewModel extends CommonModel
{
   public branchModelList: BranchModel[];

   constructor()
   {
       super();
       this.branchModelList = [];
   }
}