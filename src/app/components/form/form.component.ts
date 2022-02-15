import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/models/Person';
import { PersonService } from '../../services/person.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() loadTable = new  EventEmitter()
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get nameField() {
    return this.form.get('nombre');
  }

  get fileField() {
    return this.form.get('documento');
  }

  save(){
    if (this.form.valid) {
      const person:Person = this.form.value;
      this.personService.savePerson(person)
      this.openSnackBar('Guardado con exito', 'Ok')
      this.loadTable.emit()
    }else {
      this.form.markAllAsTouched()
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];

    if(file){
      return this.fileField?.setValue(file.name)
    }
    return this.fileField?.setValue('')
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }
}
