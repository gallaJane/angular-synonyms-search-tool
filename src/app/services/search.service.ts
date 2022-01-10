import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { NewWord } from '@api/models/newWord';
import { Observable, throwError } from 'rxjs';
import { Response } from '@api/models/response';


@Injectable()
export class SearchService {
  private searchWordUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  wordItems!: Response;
  isError1: boolean = false;
  isError2: boolean = false;

  constructor(private http: HttpClient,
    private router: Router) { }


  searchWord(query: string): Observable<any> {
    let searchUrl = `${this.searchWordUrl}${query}`;
    return this.http.get(searchUrl);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  search(query: string): void {
    let trimmed: string;
    if (query != null) {
      trimmed = query.trim().toLowerCase();
      if (trimmed.length > 1 && !trimmed.includes(' ')) {
        this.router.navigate(['/search', trimmed]);
      } else {
        this.isError1 = true;
      }
    } else {
      this.isError2 = true;
    }

  }

  create(createWordRequest: NewWord) {
    // imaginary creation
    alert(JSON.stringify(createWordRequest));

  }

}
