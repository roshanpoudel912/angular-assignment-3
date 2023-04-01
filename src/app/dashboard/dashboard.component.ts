import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.add("DashboardComponent ngOnInit() started.")
    ////
    ////
    ///

    //

    //
    
    this.messageService.add("DashboardComponent ngOnInit() completed.")
  }

  
}
