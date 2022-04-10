import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ILesson } from '../models/lesson';
import { UserService } from './user.service';
import { IUser } from '../models/user';
import { IImage } from '../models/image';
import { IComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})

export class LessonService {

  path: string = 'https://parseapi.back4app.com';

  headers = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': 'IeuI9QI8YYccmwWu3DOFKtFcRhLwtpFcVExXE4Fa',
    'X-Parse-REST-API-Key': 'dlf9vABNHrqPn05eyiyB1tZnKmTcfFM4xV8m1oB7',
  }

  constructor(private http: HttpClient, private userService: UserService) { }

  get currentUser(): IUser {
    return this.userService.sessionData;
  }

  getLessons(): Observable<ILesson[]> {
    return this.http.get<ILesson[]>(`${this.path}/classes/Lesson`, { headers: this.headers })
  }

  getLesson(objectId: number): Observable<ILesson> {
    return this.http.get<ILesson>(`${this.path}/classes/Lesson/${objectId}`, { headers: this.headers });
  }

  createLesson(body: { title: string, city: string, description: string, image: string, online: boolean, owner: Object }): Observable<ILesson> {
    return this.http.post<ILesson>(`${this.path}/classes/Lesson/`, body, {
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'IeuI9QI8YYccmwWu3DOFKtFcRhLwtpFcVExXE4Fa',
        'X-Parse-REST-API-Key': 'dlf9vABNHrqPn05eyiyB1tZnKmTcfFM4xV8m1oB7',
        'X-Parse-Session-Token': this.currentUser.sessionToken
      }

    });
  }

  deleteLesson(objectId: number) {
    return this.http.delete(`${this.path}/classes/Lesson/${objectId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'IeuI9QI8YYccmwWu3DOFKtFcRhLwtpFcVExXE4Fa',
        'X-Parse-REST-API-Key': 'dlf9vABNHrqPn05eyiyB1tZnKmTcfFM4xV8m1oB7',
        'X-Parse-Session-Token': this.currentUser.sessionToken
      }
    })
  }

  updateLesson(body: { title: string, city: string, description: string, image: string, online: boolean, owner: Object }, objectId: string): Observable<ILesson> {
    return this.http.put<ILesson>(`${this.path}/classes/Lesson/${objectId}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'IeuI9QI8YYccmwWu3DOFKtFcRhLwtpFcVExXE4Fa',
        'X-Parse-REST-API-Key': 'dlf9vABNHrqPn05eyiyB1tZnKmTcfFM4xV8m1oB7',
        'X-Parse-Session-Token': this.currentUser.sessionToken
      }
    })
  }

  searchLesson(query: string): Observable<ILesson[]> {
    return this.http.get<ILesson[]>(`${this.path}/classes/Lesson?where=${(JSON.stringify(query))}`, { headers: this.headers })
  }

  postComment(body: {content: string, owner: Object, lesson: Object}): Observable<IComment> {
    return this.http.post<IComment>(`${this.path}/classes/Comments/`, body, { 
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'IeuI9QI8YYccmwWu3DOFKtFcRhLwtpFcVExXE4Fa',
        'X-Parse-REST-API-Key': 'dlf9vABNHrqPn05eyiyB1tZnKmTcfFM4xV8m1oB7',
        'X-Parse-Session-Token': this.currentUser.sessionToken
      }
     })
  }

  commentsByLesson(lessonId: string) {
    return this.http.get(`${this.path}/classes/Comments?where=${this.createPointerQuery('lesson', 'Lesson', lessonId)}&include=owner`, { headers: this.headers })
  }

  createPointerQuery(propName: any, className: any, objectId: any) {
    return this.createQuery({[propName]: this.createPointer(className, objectId)})
  }

  createQuery(query: any) {
    return encodeURIComponent(JSON.stringify(query));
  }

  createPointer(className: any, objectId: any) {
    return {
      __type: 'Pointer',
      className,
      objectId
    }
  }
}
