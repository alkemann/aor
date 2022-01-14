import { RoundService } from './../../services/round.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { Component } from '@angular/core';

@Component({
  selector: 'aor-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.scss']
})
export class AdvancesComponent {

  constructor(
    public advancesService: AdvancesService,
    public roundService: RoundService
  ) { }

}
