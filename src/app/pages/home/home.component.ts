import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '@api/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SearchService]
})
export class HomeComponent implements OnInit {
  // @ViewChild('searchTerm', { static: true }) searchTerm!: ElementRef;

  isError1: boolean = false;
  isError2: boolean = false;

  constructor(private router: Router,
    private searchService: SearchService) {}

  ngOnInit() {}

  searchFor(query: string) {
    this.searchService.search(query);
    this.isError1 = this.searchService.isError1;
    this.isError2 = this.searchService.isError2;
  }

}
