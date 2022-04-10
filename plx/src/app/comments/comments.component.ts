import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LessonService } from '../core/lesson.service';
import { IComment } from '../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private lessonService: LessonService, private route: ActivatedRoute) { }

  comments?: IComment[];
  resultComments: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.lessonService.commentsByLesson(id).subscribe(data => {
        this.resultComments = data;
        this.comments = this.resultComments.results;
      })
    })
  }

}
