import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LessonService } from 'src/app/core/lesson.service';
import { UserService } from 'src/app/core/user.service';
import { ILesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  lessons?: ILesson[];
  resultLessons: any;
  userLessons?: ILesson[];
  currentUserEmail!: string;
  currentUserUsername!: string;

  constructor(private lessonService: LessonService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      let user = this.userService.getUserData()
      this.currentUserEmail = user.email
      this.currentUserUsername = user.username
      this.lessonService.getLessons().subscribe((data) => {
        this.resultLessons = data;
        this.lessons = this.resultLessons.results;
        this.userLessons = this.lessons?.filter(l => l.owner.objectId == user.objectId)
      })
    })
  }
}
