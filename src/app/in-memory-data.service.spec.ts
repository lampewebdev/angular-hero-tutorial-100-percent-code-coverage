import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createDB should return the seeded heroes', () => {
    const db = service.createDb();
    expect(db).toEqual(service.seed);
  });

  it('genId() should return 21 if an db is created', () => {
    const heroes: Hero[] = service.createDb();
    const id: number =  service.genId(heroes);
    expect(id).toBe(21);
  });

  it('genId() should return 1 if no db is created', () => {
    const id: number =  service.genId([]);
    expect(id).toBe(1);
  });
});
