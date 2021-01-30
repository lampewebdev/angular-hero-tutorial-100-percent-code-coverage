import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero!: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.heroService.getHero(parseInt(id, 10))
        .subscribe(hero => this.hero = hero);
    }
  }
  save(): void {
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(
        () => this.goBack()
      );
    }
  }
  goBack(): void {
    this.location.back();
  }
}
