import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes() should call http Get and return an array of Heroes', () => {
    const heroes: Hero[] = [{id:1, name:'Test Hero'}, {id:2, name: 'Another Hero'}];

    service.getHeroes().subscribe((obtainedHeroes) => {
      expect(obtainedHeroes).toEqual(heroes);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');
    req.flush(heroes);
  });

  it('getHero() should call http Get method and return hero with id 1', () => {
    const hero: Hero = {id: 1, name: 'test hero'};

    service.getHero(1).subscribe((obtainedHero) =>{
      expect(obtainedHero).toBe(hero);
    });

    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('GET');
    req.flush(hero);
  });

  it('getHero() error', () => {
    const hero: Hero = {id: 1, name: 'test hero'};

    service.getHero(1).subscribe(
      (obtainedHero) =>{}
    );

    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('GET');
    req.flush('some error', { status: 400, statusText:'server error'});
  });

  it('updateHero() should call http PUT and update the given hero', () => {
    const heroToUpdate: Hero = {id:1, name:'new name'};

    const handleError = spyOn<any>(service, 'handleError');
    service.updateHero(heroToUpdate).subscribe(() => {
      expect(handleError).toHaveBeenCalled();
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');
    req.flush(heroToUpdate);

  });

  it('addHero() should call http POST and create the given hero', () => {
    const heroToCreate: Hero = {id: 2, name: 'new hero'};
    service.addHero(heroToCreate).subscribe((obtainedHero) => {
      expect(obtainedHero).toEqual(heroToCreate);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');

    req.flush(heroToCreate);
  });
  it('deleteHero() should call http POST and delete the given hero', () => {
    const heroToDelete: Hero = {id: 2, name: 'new hero'};
    service.deleteHero(heroToDelete).subscribe((obtainedHero) => {
      expect(obtainedHero).toEqual(heroToDelete);
    });

    const req = httpMock.expectOne('api/heroes/2');
    expect(req.request.method).toEqual('DELETE');

    req.flush(heroToDelete);
  });

  it('deleteHero() should call http POST and delete the given hero by id', () => {
    const heroToDelete: Hero = {id: 2, name: 'new hero'};
    const heroId = 2;
    service.deleteHero(heroId).subscribe((obtainedHero) => {
      expect(obtainedHero).toEqual(heroToDelete);
    });

    const req = httpMock.expectOne('api/heroes/2');
    expect(req.request.method).toEqual('DELETE');

    req.flush(heroToDelete);
  });

  it('searchHeroes() should call http GET and return a list of heroes', () => {
    const searchTerm = 'a';
    const heroes: Hero[] = [{id: 1, name: 'a'}];

    service.searchHeroes(searchTerm).subscribe((obtainedHero) => {
      expect(obtainedHero).toEqual(heroes);
    });

    const req = httpMock.expectOne('api/heroes/?name=a');
    expect(req.request.method).toEqual('GET');

    req.flush(heroes);
  });
  it('searchHeroes() should not call http and return a empty list of heroes when no search term is given', () => {
    const searchTerm = '';

    service.searchHeroes(searchTerm).subscribe((obtainedHero) => {
      expect(obtainedHero).toEqual([]);
    });
  });

  it('searchHeroes() should call http GET and return a empty list of heroes when no hero is found', () => {
    const searchTerm = 'a';

    service.searchHeroes(searchTerm).subscribe((obtainedHero) => {
      expect(obtainedHero).toEqual([]);
    });

    const req = httpMock.expectOne('api/heroes/?name=a');
    expect(req.request.method).toEqual('GET');

    req.flush([]);
  });
});
