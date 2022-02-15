import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/Person';
import { Response } from '../models/Response';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  $emitter = new EventEmitter();
  persons: Person[] =[]

  constructor(
    private http: HttpClient
  ) {
   }

  getAllPersons() {
    return this.http.get<Response>('https://randomapi.com/api/ia5vvxcx?key=HWHH-YICE-UA7Y-0CM0')
  }

  savePerson(person:Person){
    this.persons.push(person)
    localStorage.setItem('perons',JSON.stringify(this.persons))
    this.$emitter.emit();
  }

  getLastPerson(){
    this.persons = JSON.parse(localStorage.getItem('perons') || '{}');
    return this.persons[this.persons.length - 1]
  }
}
