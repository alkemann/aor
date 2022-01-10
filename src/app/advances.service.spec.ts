import { Advance } from 'src/app/advances.service';
import { TestBed } from '@angular/core/testing';

import { AdvancesService } from './advances.service';

describe('AdvancesService', () => {
  let service: AdvancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('key A is The Heavens', () => {
    const a : Advance = service.byKey('A');
    expect(a.name).toEqual("The Heavens");
  });
});
