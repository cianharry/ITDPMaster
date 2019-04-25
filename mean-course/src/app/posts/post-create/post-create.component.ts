import { Component, OnInit } from '@angular/core';

import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredDesc = '';
  enteredSalary = '';
  enteredLocation = '';
  enteredClient = '';
  enteredDuration = '';
  post: Post;
  private state = 'create';
  private postId: string;

  // post service injected
  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

ngOnInit() {
  // executed whenever a parameter changes
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('postId')) {
      this.state = 'edit';
      this.postId = paramMap.get('postId');
      this.post = this.postsService.getPost(this.postId);
    } else {
      this.state = 'create';
      this.postId = null;
    }
  });
}

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
