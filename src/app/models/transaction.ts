import { Balance } from './balance';

export class Transaction {
    sender: string;
    reciever: string;
    validated: boolean = false;

    data: Balance = new Balance();
}
