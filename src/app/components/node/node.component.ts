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

  connected: boolean = false;
  connectedTo: string = '';

  nodes: string[] = [];

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.trackerField = this.nodeService.trackerUrl;
    this.connectedTo = this.nodeService.nodeUrl;
    this.connected = this.connectedTo ? true : false;

    this.GetNodes();
  }

  GetNodes(): void {
    if (this.trackerField) {
      this.nodeService.getNodes(this.trackerField).subscribe(nodes => this.nodes = nodes, console.error);
    }
  }

  Connect(): void {
    this.nodeService.connectToNode(this.nodeField).then(res => {
      this.connectedTo = this.nodeService.nodeUrl;
      this.connected = true;
    });
  }

}
