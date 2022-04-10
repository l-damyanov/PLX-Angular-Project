import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonService } from '../core/lesson.service';
import { UserService } from '../core/user.service';
import { IImage } from '../models/image';
import { IUser } from '../models/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createFormGroup: FormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    'image': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    'description': new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(300)]),
    'online': new FormControl('')
  })

  constructor(private formBuilder: FormBuilder, private lessonService: LessonService, private router: Router, private userService: UserService) { }

  currentUser = this.userService.getUserData();

  ngOnInit(): void {
    console.log(this.currentUser)
  }

  createHandler(): void {

    const { title, image, city, description } = this.createFormGroup.value;
    const online = this.createFormGroup.value.online ? true : false

    const body: {title: string, image: string, city: string, description: string, online: boolean, owner: any} = {
      title: title,
      image: image,
      city: city,
      description: description,
      online: online,
      owner: {
        __type: "Pointer",
        className: "_User",
        objectId: this.currentUser.objectId
      }
    }

    this.lessonService.createLesson(body).subscribe({
      next: (lesson) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
