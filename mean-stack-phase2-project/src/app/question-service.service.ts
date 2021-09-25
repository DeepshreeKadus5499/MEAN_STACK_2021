import { Injectable } from '@angular/core';
import { Question } from './question';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(public http:HttpClient) { }

  loadJsonData():Observable<Question[]>
  {
    return this.http.get<Question[]>("/assets/question.json")   
  }
}
