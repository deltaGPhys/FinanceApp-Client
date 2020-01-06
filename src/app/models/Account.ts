export class Account {
    id: number;
    balance : number;
    openingDate : Date;
    accountTypeId: number;
    accountType: string
    userid: number;
    owner: string;
    acctName : string;

    constructor(id:number, balance:number, openingDate:Date, accountTypeId: number, accountType:string,  userId: number, owner:string, acctName:string){
        this.id = id;
        this.balance = balance;
        this.openingDate = openingDate;
        this.accountTypeId = accountTypeId;
        this.accountType = accountType;
        this.userid = userId;
        this.owner = owner;
        this.acctName = acctName;
      
    }
}