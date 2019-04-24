import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  // dependancy injection
  constructor(public postsServices: PostsService) {}

  // function for basic initialization tasks
  ngOnInit() {
    this.postsServices.getPosts();
    this.postsServices.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  // used to prevent memory leaks when this component is not being used directly
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
