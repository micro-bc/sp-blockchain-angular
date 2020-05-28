import { Injectable } from '@angular/core';
import { ec } from 'elliptic';

const EC = new ec('secp256k1');

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private static localStorageKey: string = 'privateKey';

  keyPair: ec.KeyPair;

  constructor() { }

  login(privateKey: string): boolean {
    let tkp = EC.keyFromPrivate(privateKey, 'hex');

    if (!tkp.validate().result) return false;

    localStorage.setItem(WalletService.localStorageKey, privateKey);
    this.keyPair = tkp;
    return true;
  }

  register(): string {
    // TODO: send to api
    return EC.genKeyPair().getPrivate('hex');
  }

}
