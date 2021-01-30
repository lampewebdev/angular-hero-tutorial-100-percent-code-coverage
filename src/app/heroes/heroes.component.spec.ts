import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ HeroesComponent ],
      providers: [HeroService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add() should add a hero to the heroes', fakeAsync(() => {
    const resp1: Hero[] = [{id: 1, name:'new hero'}];
    const resp2: Hero = {id: 2, name: 'second hero'};
    const expectedHeros = [...resp1, resp2];
    spyOn(heroService, 'getHeroes').and.returnValue(of(resp1));
    spyOn(heroService, 'addHero').and.returnValue(of(resp2));

    fixture.detectChanges();
    tick(1);
    expect(component.isLoading).toBeFalsy();
    expect(component.heroes).toEqual(resp1);

    component.add(resp2.name);
    fixture.detectChanges();
    tick(1);
    expect(component.isLoading).toBeFalsy();
    fixture.detectChanges();
    expect(component.heroes).toEqual(expectedHeros);
  }));

  it('add() should return when no name is given', () => {
    const addHeroSpy = spyOn(heroService, 'addHero');
    component.add('');
    fixture.detectChanges();
    expect(addHeroSpy).not.toHaveBeenCalled();
  });

  it('delete() should call the heroService and delete a hero', fakeAsync(() => {
    const hero: Hero = {id:1, name: 'delete me'};
    spyOn(heroService, 'getHeroes').and.returnValue(of([hero]));
    fixture.detectChanges();
    tick(1);
    expect(component.isLoading).toBeFalsy();
    expect(component.heroes).toEqual([hero]);

    component.delete(hero);
    fixture.detectChanges();
    expect(component.heroes).toEqual([]);
  }));
});
