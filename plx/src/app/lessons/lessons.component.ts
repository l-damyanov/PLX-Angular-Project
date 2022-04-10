import { Component, OnInit } from '@angular/core';
import { LessonService } from '../core/lesson.service';
import { ILesson } from '../models/lesson';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons?: ILesson[];
  resultLessons: any;

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.lessonService.getLessons().subscribe(data => {
      this.resultLessons = data;
      this.lessons = this.resultLessons.results;
      // console.log(this.resultLessons.results[0].image.url)
      // this.lessons?.forEach(l => console.log(l.image.url));
    })
  }

}
