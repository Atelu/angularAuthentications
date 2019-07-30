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
  selectedIndex = 0;


  nameFormControl = new FormControl('', [Validators.required, Validators.email]);

  gendergroup: string[];
  agegroup: string[];
  servicetypes: string[];
  serviceplacetypes: string[];
  patientcategorytype: string[];
  patientstatus: string[];
  agegroupcategory: string[];
  clinics: string[];
  facilitybranch: string[];
  maintype: string[];


  // dataSource = new UserDataSource(this.userService);
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'Code',
    'Gender',
    'Patient Status',
    'Main Type',
    'Head name',
    'isActive',
    'Actions'
  ];
  selection = new SelectionModel(true, []);

  tableData = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  serviceForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getUser();
    this.getFormOptions();

    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      gendergroup: '',
      servicePlacePatientCategories: '',
      patientstatus: '',
      ServicePlaceServicePlaceType: '',
      servicePlaceAgegroups : '',
      UserServicePlaces: '',
      ServicePlaceBranches: '',
      maintypes: '',
      headname: ['', Validators.required],
      ServicePlaceServiceTypes: '',


    });
  }

    submitForm(): void {
      return;
    }
  nextStep(row) {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
    console.log('Next Step', row);
  }

  previousStep() {
    if (this.selectedIndex !== 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
  }

  getFormOptions(): void {
    this.userService.getFormOptions().subscribe(data => {
      this.gendergroup = data[0].data.content;
      this.agegroup = data[1].data.content;
      this.servicetypes = data[2].data.content;
      this.serviceplacetypes = data[3].data.content;
      this.patientcategorytype = data[4].data.content;
      this.clinics = data[5].data.content;
      this.facilitybranch = data[6].data.content;
      this.patientstatus = data[7].data.content;
      this.maintype = data[8].data.content;
      this.agegroupcategory = data[9].data.content;
    });
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      users => {
        // console.log('resp', users.data.content);
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
