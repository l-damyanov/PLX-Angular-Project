import { Component, Input, OnInit } from '@angular/core';
import { ILesson } from '../models/lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  @Input() lesson?: ILesson;

  constructor() { }

  ngOnInit(): void {
  }

}
