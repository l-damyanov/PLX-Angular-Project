import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../core/lesson.service';
import { UserService } from '../core/user.service';
import { ILesson } from '../models/lesson';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @ViewChild('updateProfileForm') updateProfileForm!: NgForm;

  selectedLesson!: ILesson;

  currentUser = this.userService.getUserData();

  updateFormGroup: FormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    'image': new FormControl('', [Validators.required]),
    'city': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    'description': new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(300)]),
    'online': new FormControl('')
  })

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.lessonService.getLesson(id).subscribe((data) => {
        this.selectedLesson = data;
        this.updateFormGroup.patchValue({
          title: this.selectedLesson.title,
          image: this.selectedLesson.image,
          city: this.selectedLesson.city,
          description: this.selectedLesson.description,
          online: this.selectedLesson.online,
        })
      })
    })
  }

  updateHandler(): void {
    console.log('form submitted!')
    const { title, image, city, description } = this.updateFormGroup.value;
    const online = this.updateFormGroup.value.online ? true : false

    const body: { title: string, image: string, city: string, description: string, online: boolean, owner: any } = {
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

    console.log(body)

    this.lessonService.updateLesson(body, this.selectedLesson.objectId).subscribe({
      next: (lesson) => {
        this.router.navigate([`/details/${this.selectedLesson.objectId}`]);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
