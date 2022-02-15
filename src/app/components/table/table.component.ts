import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Person } from 'src/app/models/Person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  persons: Person[] = []
  displayedColumns: string[] = ['nombre', 'edad', 'sexo', 'documento']
  dataSource: MatTableDataSource<Person>
  lengthPages: number

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private personService: PersonService) {
    personService.$emitter.subscribe(() => {
      this.updateData()
    });
    this.dataSource = new MatTableDataSource(this.persons)
    this.lengthPages = this.persons.length
  }

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe(response => {
      this.persons = response.results[0].data
      this.loadData()
    })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  loadData(){
    this.lengthPages = this.persons.length
    this.dataSource.data = this.persons
  }

  updateData(){
    this.persons.unshift(this.personService.getLastPerson())
    this.loadData()
  }
}
