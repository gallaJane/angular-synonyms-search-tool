import { Component, OnInit } from '@angular/core';
import { Synonym } from '@api/models/synonym';
import { PartOfSpeech } from '@api/models/partOfSpeech';
import { SearchService } from '@api/services/search.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-word',
  templateUrl: './newWord.component.html',
  styleUrls: ['./newWord.component.css']
})
export class NewWordComponent implements OnInit {
  
  synonyms!: Synonym[];
  newWordForm!: FormGroup;
  meaningForm!: FormGroup;
  partOfSpeech: any = [];
  meanings!: FormArray;
  isSubmitted!: boolean;
 
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.preparing();
    this.initialForm();
  }

  preparing() {
    for (var n in PartOfSpeech) {
      if (typeof PartOfSpeech[n] === 'number') {
        this.partOfSpeech.push({ id: <any>PartOfSpeech[n], name: n });
      }
    }
  }

  private initialForm() {
    this.newWordForm = this.formBuilder.group({
      word: ['', Validators.required],
      meanings: this.formBuilder.array([this.createItem()]),
    });    
}

save(post:any, isValid:boolean ) {
  this.newWordForm;
  this.isSubmitted = true;
  if (isValid) {
    this.ngxService.start();
  } else {
    return;
  }

   this.newWordForm.value.meanings.forEach((x: any) => {
     if(x.synonyms!=null){
      x.synonyms = x.synonyms.split(",").map((y : any) => new Synonym(y));
     }
    
  });
    
  this.searchService.create({ text: this.newWordForm.value.word, meanings: this.newWordForm.value.meanings })
  // .subscribe((data: any) => {
    this.ngxService.stop();
    this.newWordForm.value.meanings = null;
    this.newWordForm.value.word = null;
    this.newWordForm.controls['meanings'].reset();
    this.newWordForm.controls['word'].reset();
    if(this.meanings!=undefined) {
      for (let index = 0; index < this.meanings.length; index++) {
        this.meanings.removeAt(index);
      }
    }
 
  // }, (error:any) => {
    this.ngxService.stop();
    this.newWordForm.controls['meanings'].reset();
    this.newWordForm.controls['word'].reset();

    if(this.meanings!=undefined) {
    for (let index = 0; index < this.meanings.length; index++) {
      this.meanings.removeAt(index);
    }
  }
  // });
}

cancel(){
  this.router.navigate(['/']);
}

remove(i: number) {
  this.meanings.removeAt(i);
}

createItem(): FormGroup {
  return this.formBuilder.group({
    text: [null],
    synonyms: [null],
    partOfSpeech: [PartOfSpeech.Adjective],
  });
}

addItem(): void {    
  this.meanings = this.newWordForm.get('meanings') as FormArray;
  this.meanings.push(this.createItem());
}

get word(){
  return (<FormGroup>this.newWordForm.get('word'));
}

get meaningsFormArr(): FormArray {
  return this.newWordForm.get('meanings') as FormArray;
}

}