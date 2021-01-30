/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {
  heroes!: Hero[];
  private _isLoading!: boolean;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  public get isLoading() {
    return this._isLoading;
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      }
    );
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroes(): void {
    this._isLoading = true;
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this._isLoading = false;
      this.heroes = heroes;
    });
  }
}
