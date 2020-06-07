import { Injectable } from '@angular/core';
import { ec } from 'elliptic';

import { Transaction } from '../models/transaction';

const EC = new ec('secp256k1');

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  static localStorageKey: string = 'credentials';

  username: string;
  private keyPair: ec.KeyPair;

  constructor() {

    const credentials = localStorage.getItem(WalletService.localStorageKey);
    if (credentials) {
      let splt = credentials.split(';');
      this.username = splt[0];
      this.keyPair = EC.keyFromPrivate(splt[1], 'hex');
    }

  }

  login(username:string, privateKey: string): void {
    let tkp = EC.keyFromPrivate(privateKey, 'hex');

    localStorage.setItem(WalletService.localStorageKey, username + ';' + privateKey);
    this.username = username;
    this.keyPair = tkp;
  }

  logout(): void {
    this.keyPair = null;
    localStorage.clear();
  }

  getPublic(): string {
    return this.keyPair.getPublic('hex');
  }


  sign(tx: Transaction): string {
    return this.keyPair.sign(JSON.stringify(tx), 'utf-8').toDER('hex');
  }

}
