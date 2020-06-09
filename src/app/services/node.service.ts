import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators'

import { Transaction } from '../models/transaction';
import { WalletService } from './wallet.service';
import { Balance } from '../models/balance';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private static trackerLocalStorage: string = 'tracker';
  private static nodeSessionStorage: string = 'node';

  trackerUrl: string = 'localhost:2002';
  nodeUrl: string;

  transactions: Transaction[] = [];
  balance: Balance = new Balance();

  constructor(
    private http: HttpClient,
    private wallet: WalletService
  ) {
    const trackerUrl = localStorage.getItem(NodeService.trackerLocalStorage);
    if (trackerUrl) {
      this.trackerUrl = trackerUrl;
    }

    const nodeUrl = sessionStorage.getItem(NodeService.nodeSessionStorage);
    if (nodeUrl) {
      this.connectToNode(nodeUrl).then(succ => {
        if (succ) {
          this.refreshData();
        }
      });
    }
  }

  setTrackerURL(trackerUrl: string): void {
    this.trackerUrl = trackerUrl;
    localStorage.setItem(NodeService.trackerLocalStorage, trackerUrl);
  }

  setNodeURL(nodeUrl: string): void {
    this.nodeUrl = nodeUrl;
    sessionStorage.setItem(NodeService.nodeSessionStorage, nodeUrl);
  }

  getNodes(trackerUrl: string = this.trackerUrl): Observable<string[]> {
    let obs = this.http.get<string[]>('http://' + trackerUrl).pipe<string[]>(share());

    obs.subscribe(() => this.setTrackerURL(trackerUrl));

    return obs;
  }

  async connectToNode(nodeUrl: string): Promise<boolean> {

    if (nodeUrl.length === 0) return false;

    return this.http.get('http://' + nodeUrl).toPromise().then(_ => {
      this.setNodeURL(nodeUrl);
      return true;
    }, _ => { return false; });
  }


  prepareAndSend(tx: Transaction): Observable<Object> {
    tx.sender = this.wallet.getPublic();
    const sig = this.wallet.sign(tx);

    let obj = { transaction: tx, signature: sig };
    return this.http.post('http://' + this.nodeUrl + '/transaction', obj);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://' + this.nodeUrl + '/transactions/' + this.wallet.getPublic());
  }

  getBalance(): Observable<Balance> {
    return this.http.get<Balance>('http://' + this.nodeUrl + '/balance/' + this.wallet.getPublic());
  }

  refreshData(): void {
    this.getTransactions().subscribe(txs => {
      this.transactions = txs;
    }, console.error);

    this.getBalance().subscribe(bal => {
      this.balance = bal;
    }, console.error);
  }

}
