export class Account {
    id: number;
    balance : number;
    openingDate : Date;
    accountNumber: number;
    accountType: string
    userid: number;
    acctName : string;

    constructor(id:number, balance:number, openingDate:Date, accountNumber: number, accountType:string,  userId: number, acctName:string){
        this.id = id;
        this.balance = balance;
        this.openingDate = openingDate;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.userid = userId;
        this.acctName = acctName;
      
    }
}