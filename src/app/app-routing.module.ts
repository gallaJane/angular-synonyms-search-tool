import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@api/pages/home/home.component';
import { DefinitionComponent } from '@api/pages/definition/definition.component';
import { NewWordComponent } from '@api/pages/newWord/newWord.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search/:word', component: DefinitionComponent },
  { path: 'new', component: NewWordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
