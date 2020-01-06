
export class Transaction {
    id: number;
    type: string; 
    amount: number;
    account: number;
    comment: string;
    dateCreated: string;
    accountBalance: number;

    constructor(id:number,transactionType:string,account:number,amount:number,comment:string){
        this.id = id;
        this.type = transactionType;
        this.amount = amount;
        this.account = account;
        this.comment = comment;
    }
}