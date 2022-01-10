import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '@api/models/Config';
import {  Definition } from '@api/models/definition';
import { SearchService } from '@api/services/search.service'

@Component({
    selector: 'accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.css'],
  })

  export class AccordionComponent implements OnInit {
    @Input() options!: any;
    @Input() definitions!: Definition[];
    config!: Config;
    isError1: boolean = false;
    isError2: boolean = false;

    constructor(private router: Router,
      private searchService: SearchService) {}
  
    ngOnInit() {
      this.config = this.mergeConfig(this.options);
    }
  
    mergeConfig(options: Config) {
      const config = {
        // selector: '#accordion',
        multi: true,
      };
  
      return { ...config, ...options };
    }
  
    toggle(index: number) {
      if (!this.config.multi) {
        this.definitions
          .filter((definitions, i) => i !== index && definitions.active)
          .forEach((definitions) => (definitions.active = !definitions.active));
      }
  
      // Menu active
      this.definitions[index].active = !this.definitions[index].active;
    }

    searchFor(query: string) {
      this.searchService.search(query);
      this.isError1 = this.searchService.isError1;
      this.isError2 = this.searchService.isError2;
    }
  }