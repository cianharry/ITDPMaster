import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';


const routes: Routes = [
  { path: '', component: PostCreateComponent },
  { path: 'contracts', component: PostListComponent },
  { path: 'edit/:postId', component: PostCreateComponent }
];


// This is what makes the angular router aware of our routes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
