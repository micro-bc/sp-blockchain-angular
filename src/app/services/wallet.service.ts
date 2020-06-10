import { Injectable } from '@angular/core';
import { ec } from 'elliptic';

import { Transaction } from '../models/transaction';

const EC = new ec('secp256k1');

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  static sessionStorageKey: string = 'credentials';

  username: string;
  private keyPair: ec.KeyPair;

  constructor() {

    const credentials = sessionStorage.getItem(WalletService.sessionStorageKey);
    if (credentials) {
      let splt = credentials.split(';');
      this.username = splt[0];
      this.keyPair = EC.keyFromPrivate(splt[1], 'hex');
    }

  }

  login(username:string, privateKey: string): void {
    let tkp = EC.keyFromPrivate(privateKey, 'hex');

    sessionStorage.setItem(WalletService.sessionStorageKey, username + ';' + privateKey);
    this.username = username;
    this.keyPair = tkp;
  }

  logout(): void {
    this.keyPair = null;
    sessionStorage.removeItem(WalletService.sessionStorageKey);
  }

  getPublic(): string {
    return this.keyPair.getPublic('hex');
  }


  sign(data): string {
    return this.keyPair.sign(data, 'utf-8').toDER('hex');
  }

}
