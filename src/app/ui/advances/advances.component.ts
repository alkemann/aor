import { AdvancesService } from 'src/app/services/advances.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aor-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.scss']
})
export class AdvancesComponent implements OnInit {

  constructor(public advancesService: AdvancesService) { }

  ngOnInit(): void {}

}
