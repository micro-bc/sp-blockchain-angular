import { Balance } from './balance';

export class Transaction {
    sender: string;
    reciever: string;

    data: Balance = new Balance();
}
