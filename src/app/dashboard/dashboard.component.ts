import { Router, NavigationEnd, RouterEvent } from '@angular/router';
// import { UserDataSource } from './../user-data-source';
import { Serviceplace } from './../models/Serviceplace';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { subscribeOn, filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  isloading = true;
  users: Serviceplace[];
  tableform: FormGroup;

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  Gender: string[];
  patientcategorytype: string[];
  patientstatus: string[];
  serviceplacetype: string[];

  constructor(private userService: UserService, private router: Router) { }

  // dataSource = new UserDataSource(this.userService);
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'Code',
    'Gender',
    'Patient Status',
    'Main Type',
    'Head name',
    'isActive'
  ];
  selection = new SelectionModel(true, []);

  tableData = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getUser();
    this.getFormOptions();
  }

  getFormOptions(): void {
    this.userService.getFormOptions().subscribe(data => {
      this.patientcategorytype = data as string[];
      this.patientstatus = data as string[];
      this.patientstatus = data as string[];
      console.log(data);

    });
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      users => {
        console.log('resp', users.data.content);
        // this.dataSource = new MatTableDataSource(users.data.content);
        // this.dataSource.paginator = this.paginator;
        this.tableData = users.data.content;
        this.initTable();
        this.isloading = false;
      },
      error => (this.isloading = false)
    );
  }

  load(): void {

    this.getUser();
    this.isloading = true;

  }

  initTable(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
  }
}
