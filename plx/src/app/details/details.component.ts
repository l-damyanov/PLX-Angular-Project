import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../core/lesson.service';
import { UserService } from '../core/user.service';
import { ILesson } from '../models/lesson';
import { IUser } from '../models/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  selectedLesson!: ILesson;
  ownerUser!: IUser;
  sessionUser = this.userService.getUserData()
  isOwner!: boolean;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.lessonService.getLesson(id).subscribe((data) => {
        this.selectedLesson = data;
        this.userService.getUser(this.selectedLesson.owner.objectId).subscribe((data) => {
          this.ownerUser = data;
          this.isOwner = this.ownerUser.objectId == this.sessionUser.objectId;
          console.log(this.selectedLesson)
        })
      })
    })
  }

  handleDelete(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.lessonService.deleteLesson(id).subscribe((data) => {
      })
    })
  }

  handleEdit(): void {
    
  }

}
