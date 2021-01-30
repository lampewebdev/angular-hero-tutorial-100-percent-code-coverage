import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ HeroSearchComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    TestBed.inject(FormsModule);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('search()', async (done) => {
  //   fixture.detectChanges();
  //   component.heroes$.subscribe((message) => {
  //     expect(message).toBe([{id:123, name:'dasdas'}]);
  //     done();
  //   });
  //   fixture.detectChanges();

  //   component.search('a');
  //   component.search('a');
  //   fixture.detectChanges();
  // });

  it('search()', fakeAsync(() => {
    const firstHeroes: Hero[] = [{id:1, name:'name1'}]; // you could use more distinct arrays: it doesn't matter much
    const secondHeroes: Hero[] = [{id:2, name:'name2'}];

    // spy on the service and make it return the first array the first time it's called, and the second heroes the second time
    spyOn(heroService, 'searchHeroes').and.returnValues(of(firstHeroes), of(secondHeroes));

    // initialize the component
    component.ngOnInit();

    // subscribe to the observable exposed by the component
    let componentHeroes: Hero[] = [];
    component.heroes$.subscribe(h => componentHeroes = h);

    // initially, it shouldn't emit anything
    expect(componentHeroes).toEqual([]);

    // launch the first search
    component.search('search1');

    // it shouldn't emit anything until 300 ms have passed
    expect(componentHeroes).toBeTruthy();

    // advance in the future
    tick(300);

    // it should have emited the first search result now
    // expect(componentHeroes).toBeFalsy();

    expect(componentHeroes).toBe(firstHeroes);

    // search again with the same term
    component.search('search1');

    // go in the future: it shouldn't have searched again since it's the same term as before
    tick(300);
    expect(componentHeroes).toBe(firstHeroes);

    // search with a different term
    component.search('search2');
    // go in the future: it should now have searched again
    tick(300);
    expect(componentHeroes).toBe(secondHeroes);
  }));
});

