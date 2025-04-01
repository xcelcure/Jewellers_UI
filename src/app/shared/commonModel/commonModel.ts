export class CommonModel {
    public totalrecords: number;
    public pageNumber: number;
    public pageSize : number;
    public message:	string;
    public failure:	boolean;
    public username:	string;
    public token:	string;
    public user_type:	string;
    constructor(){
        this.totalrecords=0;
        this.pageNumber=0;
        this.pageSize=0;
        this.message='';
        this.failure=true;
        this.username=sessionStorage.getItem("user_name");
        this.token=sessionStorage.getItem("token");
        this.user_type='';
    }
}
