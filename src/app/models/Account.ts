export class Account {
    id: number;
    balance : number;
    openingDate : number;
    accountTypeId: number;
    userId: number;
    owner: string;
    acctName : string;

    constructor(id:number, balance:number, openingDate:number, accountTypeId: number,  userId: number, owner:string, acctName:string){
        this.id = id;
        this.balance = balance;
        this.openingDate = openingDate;
        this.accountTypeId = accountTypeId;
        this.userId = userId;
        this.owner = owner;
        this.acctName = acctName;
      
    }
}