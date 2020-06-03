import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private static trackerLocalStorage: string = 'tracker';
  private static nodeSessionStorage: string = 'node';

  trackerUrl: string = 'localhost:2002';
  nodeUrl: string;

  constructor(private http: HttpClient) {
    const trackerUrl = localStorage.getItem(NodeService.trackerLocalStorage);
    if (trackerUrl) {
      this.trackerUrl = trackerUrl;
    }

    const nodeUrl = sessionStorage.getItem(NodeService.nodeSessionStorage);
    if (nodeUrl) {
      this.nodeUrl = nodeUrl;
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

}
