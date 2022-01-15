import { PlayerService } from './../../../services/player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-start-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  constructor(private PlayerService: PlayerService) { }

  ngOnInit(): void {
  }

  public makeBid(amount: string): void {
    this.PlayerService.player.payForBid(parseInt(amount));
    this.done.emit();
  }
}
