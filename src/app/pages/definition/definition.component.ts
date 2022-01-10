import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '@api/services/search.service';
import { Response } from '@api/models/response';
import { Phonetic } from '@api/models/phonetic';
import { Location } from '@angular/common';
import { Meaning } from '@api/models/meaning';
import { Config } from '@api/models/Config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {

  options: Config = { multi: false };

  paramWord: any;
  wordItems!: Response;
  audioObj = new Audio();
  phonetics!: Phonetic[];
  exist!: true;
  meanings!: Meaning[];

  constructor(private route: ActivatedRoute,
    private searchService: SearchService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.
      subscribe((params: any) => {
        this.paramWord = params.word;
        this.getWord(this.paramWord);
      }

      )
  }

  getWord(word: string) {
    this.searchService.searchWord(word)
      .subscribe(
        async (data: any) => {
          if (data[0] == null) {
            return;
          } else {
            this.wordItems = await data[0];
            this.meanings = data[0].meanings;
          }
        },
        (error: any) => console.error(error)
      );
  }

  play() {
    this.phonetics = this.wordItems.phonetics;
    if (!this.phonetics.length) {
      return;
    } else {
      this.audioObj.src = this.phonetics[0].audio.replace('//ssl', 'https://ssl');
      this.audioObj = new Audio(this.audioObj.src);
      this.audioObj.play();
    }
  }

  back() {
    this.location.back();
  }

  addWord() {
    this.router.navigate(['/new']);
  }

}


