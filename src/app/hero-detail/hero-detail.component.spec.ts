import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;
  let location: SpyLocation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        },
        {
          provide: Location,
          useClass: SpyLocation
        }
      ],
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ HeroDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    location = TestBed.get(Location);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('getHero()', () => {
    fixture.detectChanges();

    const hero: Hero = {id:1, name: 'some here'};

    spyOn(heroService, 'getHero').and.returnValue(of(hero));

    component.getHero();

    expect(component.hero).toBe(hero);
  });

  it('getHero() with no param', () => {
    // @ts-ignore
    spyOn(component.route.snapshot.paramMap, 'get').and.returnValue('');
    const hero: Hero = {id:2, name: 'some here'};

    spyOn(heroService, 'getHero').and.returnValue(of());

    component.getHero();

    expect(component.hero).toBe(undefined);
  });

  it('save() should not save if no hero is selected', () => {
    fixture.detectChanges();

    // const hero = {id: 1, name: 'sort'};
    const updateHero = spyOn(heroService, 'updateHero').and.callThrough();
    component.save();
    fixture.detectChanges();
    expect(updateHero).not.toHaveBeenCalled();
  });

  it('save() should save if a hero is selected', fakeAsync(() => {
    fixture.detectChanges();

    const hero = {id: 1, name: 'sort'};
    component.hero = hero;
    const updateHero = spyOn(heroService, 'updateHero').and.returnValue(of(hero));
    const spyGoBack = spyOn(component, 'goBack').and.returnValue();
    tick(300);

    component.save();
    fixture.detectChanges();
    tick(300);
    expect(updateHero).toHaveBeenCalled();
    expect(spyGoBack).toHaveBeenCalled();
    expect(component.hero).toBe(hero);
  }));

  it('goBack()', () => {
    fixture.detectChanges();

    spyOn(location, 'back');
    component.goBack();
    expect(component.goBack).toBeDefined();
    expect(location.back).toHaveBeenCalled();
  });
});
