import { Extras } from './extras';

export class Transaction {
    from: string;
    to: string;

    amount: number = 0;
    extras: Extras = new Extras();
}
