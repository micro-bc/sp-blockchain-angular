import { Injectable } from '@angular/core';
import { ec } from 'elliptic';
import { loadavg } from 'os';

const EC = new ec('secp256k1');

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  static localStorageKey: string = 'privateKey';

  private keyPair: ec.KeyPair;

  constructor() { }

  login(privateKey: string): boolean {
    let tkp = EC.keyFromPrivate(privateKey, 'hex');

    if (false) return false; // TODO: Check if exists

    localStorage.setItem(WalletService.localStorageKey, privateKey);
    this.keyPair = tkp;
    return true;
  }

  register(): string {
    // TODO: send to api
    return EC.genKeyPair().getPrivate('hex');
  }

  logout(): void {
    this.keyPair = null;
    localStorage.clear();
  }

}
