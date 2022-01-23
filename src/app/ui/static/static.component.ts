import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  public page: string = 'info';

  constructor() { }

  ngOnInit(): void {
    // @TODO get page from url
  }

}
