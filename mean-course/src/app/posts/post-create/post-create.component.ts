import { Component } from '@angular/core';

import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredDesc = '';
  enteredSalary = '';
  enteredLocation = '';
  enteredClient = '';
  enteredDuration = '';

  // post service injected
  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const post: Post = {
    //  title: form.value.title,
    //  salary: form.value.salary,
    //  location: form.value.location,
    //  client: form.value.client,
    //  duration: form.value.duration,
    //  desc: form.value.desc,
    // };
    this.postsService.addPost(form.value.title, form.value.salary, form.value.location, form.value.client, form.value.duration, form.value.desc);
    form.resetForm();
  }
}
