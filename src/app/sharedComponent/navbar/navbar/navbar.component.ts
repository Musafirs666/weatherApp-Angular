import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  currentUrl: string = '';
  @Input() isLargeScreen:boolean = false

  constructor(private router: Router, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getActivatedRoute()
  }

  getActivatedRoute(){
    this.activatedRoute.url.subscribe((event) => {
      this.currentUrl =event[0].path; 
    });
  }

  onHomeClick() {
    this.router.navigate(['/home']);
  }
  onCitiesClick() {
    this.router.navigate(['/cities']);
  }
  onMapClick() {
    this.router.navigate(['/map']);
  }
  onSettingClick() {
    this.router.navigate(['/setting']);
  }
}
