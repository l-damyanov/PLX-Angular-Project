import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LessonService } from '../core/lesson.service';
import { ILesson } from '../models/lesson';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  lessons?: ILesson[];
  resultLessons: any;
  searchedLessons?: ILesson[];

  searchFormGroup = new FormGroup({
    'search': new FormControl()
  })

  constructor(private lessonService: LessonService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  searchHandler(): void {
    this.lessonService.getLessons().subscribe((data) => {
      this.resultLessons = data;
      this.lessons = this.resultLessons.results;
      this.searchedLessons = this.lessons?.filter(l => l.title.toLowerCase().includes(this.searchFormGroup.value.search.toLowerCase()))
      console.log(this.searchedLessons)
    })
  }

}
