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
  mempool: Transaction[] = [];
  balance: Balance = new Balance();

  timer: NodeJS.Timeout;

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

    // this.timer = setInterval(() => this.refreshData(), 5000);
  }

  setTrackerURL(trackerUrl: string): void {
    this.trackerUrl = trackerUrl;
    localStorage.setItem(NodeService.trackerLocalStorage, trackerUrl);
  }

  setNodeURL(nodeUrl: string = null): void {
    this.nodeUrl = nodeUrl;
    if (!nodeUrl) {
      sessionStorage.removeItem(NodeService.nodeSessionStorage);
    }
    else {
      sessionStorage.setItem(NodeService.nodeSessionStorage, nodeUrl);
    }
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
    }, _ => {
      this.setNodeURL();
      return false;
    });
  }


  async prepareAndSend(tx: Transaction): Promise<void> {
    tx.sender = this.wallet.getPublic();

    return this.http.post<string>('http://' + this.nodeUrl + '/prepareTransaction', tx).toPromise().then(id => {
      const obj = {
        id: id,
        publicKey: this.wallet.getPublic(),
        signature: this.wallet.sign(id)
      }

      return this.http.post<void>('http://' + this.nodeUrl + '/sendTransaction', obj).toPromise();
    }, e => e);
  }

  getMempool(address: string = ''): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://' + this.nodeUrl + '/mempool/' + address);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://' + this.nodeUrl + '/transactions/' + this.wallet.getPublic());
  }

  getBalance(): Observable<Balance> {
    return this.http.get<Balance>('http://' + this.nodeUrl + '/balance/' + this.wallet.getPublic());
  }

  refreshData(): void {
    if (this.nodeUrl) {
      this.connectToNode(this.nodeUrl).then(res => {
        if (res) {

          this.getTransactions().subscribe(txs => {
            txs.forEach(tx => tx.validated = true);
            this.transactions = txs;
            this.getMempool(this.wallet.getPublic()).subscribe(utxs => {
              this.transactions = utxs.concat(this.transactions);
            });
          }, console.error);

          this.getMempool().subscribe(txs => {
            this.mempool = txs;
          }, console.error);

          this.getBalance().subscribe(bal => {
            this.balance = bal;
          }, console.error);

        }
      });
    }
  }


  mineBlock(): void {
    const obj = {
      publicKey: this.wallet.getPublic(),
      signature: this.wallet.sign('mineBlock')
    };

    this.http.post('http://' + this.nodeUrl + '/mineBlock', obj).subscribe({
      complete: () => this.refreshData()
    });
  }

}
