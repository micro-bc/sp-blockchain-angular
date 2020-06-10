import { Component, OnInit } from '@angular/core';
import { NodeService } from 'src/app/services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  trackerField: string;
  nodeField: string;

  nodes: string[] = [];

  constructor(public nodeService: NodeService) { }

  ngOnInit(): void {
    this.trackerField = this.nodeService.trackerUrl;

    this.GetNodes();
  }

  GetNodes(): void {
    if (this.trackerField) {
      this.nodeService.getNodes(this.trackerField).subscribe(nodes => this.nodes = nodes, console.error);
    }
  }

  Connect(): void {
    this.nodeService.connectToNode(this.nodeField);
  }

  formatAddress(address): string {
    if (!address) return 'Coinbase';

    return '...' + address.substr(address.length - 7)
  }

}
