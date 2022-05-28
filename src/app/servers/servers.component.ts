import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowAddingServer = false;
  serverCreationStatus = 'No servers created';
  serverName = 'TEst';
  serverCreated = false;
  servers =['testServ','TestServ 2'];

  constructor() {
    setTimeout(() => {
      this.allowAddingServer = true;
    }, 2000)
  }

  ngOnInit(): void {
  }
  onServerCreation() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    // this.serverCreationStatus = 'Server created. Server name is' + this.serverName;
  }
  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
