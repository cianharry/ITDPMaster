import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

// allows angular to access the sevice
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // get method extracts and formats the json data
    this.http
      .get<{ posts: any }>(
        'http://localhost:3000/api/posts'
        )
        // every post element will be mapped to a new array using pipe function
        .pipe(map((postData) => {
          return postData.posts.map(post => {
            return {
              id: post._id,
              title: post.title,
              salary: post.salary,
              location: post.location,
              client: post.client,
              duration: post.duration,
              desc: post.desc
            };
          });
        }))
        .subscribe(mappedPosts => {
          this.posts = mappedPosts;
          this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, salary: string, location: string, client: string, duration: string, desc: string) {
    const post: Post = {id: null, title: title, salary: salary, location: location, client: client, duration: duration, desc: desc};
    // will execute asynchronously only if their is a success response
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
