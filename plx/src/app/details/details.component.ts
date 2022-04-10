import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  isLogged: boolean = this.userService.isLogged;

  commentFormGroup: FormGroup = this.formBuilder.group({
    'content': new FormControl('', [Validators.maxLength(40), Validators.required])
  })

  constructor(private route: ActivatedRoute, private lessonService: LessonService,
    private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.lessonService.getLesson(id).subscribe((data) => {
        this.selectedLesson = data;
        this.userService.getUser(this.selectedLesson.owner.objectId).subscribe((data) => {
          this.ownerUser = data;
          this.isOwner = this.ownerUser.objectId == this.sessionUser.objectId;
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

  handlePostComment(): void {
    const content = this.commentFormGroup.value.content;
    this.route.params.subscribe((params) => {
      let id = params['id'];
    
      const body = {
        content: content,
        owner: {
          __type: "Pointer",
          className: "_User",
          objectId: this.sessionUser.objectId
        },
        lesson: {
          __type: "Pointer",
          className: "Lesson",
          objectId: id
        }
      }

      this.lessonService.postComment(body).subscribe({
        next: (comment) => {
          this.router.navigate([`/home`]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }

}
