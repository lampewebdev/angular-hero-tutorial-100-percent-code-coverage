// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterModule } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';

// import { DashboardComponent } from './dashboard.component';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let heroService: HeroService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       declarations: [ DashboardComponent ],
//       providers: [ HeroService, RouterTestingModule ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     heroService = TestBed.inject(HeroService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('getHeroes() should return top 3 heroes', () => {
//     const resp1: Hero[] = [
//       {id: 1, name:'new hero'},
//       {id: 2, name:'new hero'},
//       {id: 3, name:'new hero'},
//       {id: 4, name:'new hero'},
//       {id: 5, name:'new hero'},
//       {id: 6, name:'new hero'}
//     ];
//     spyOn(heroService, 'getHeroes').and.returnValue(of(resp1));

//     component.getHeroes();

//     expect(component.heroes.length).toBe(3);
//   });
// });
