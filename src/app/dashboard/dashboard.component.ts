import { User } from './../models/User';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';
import { Serviceplace } from './../models/Serviceplace';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { first } from 'rxjs/operators';

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
  serviceForm: FormGroup;
  selectedIndex = 0;
  selected = false;
  tableData = null;
  editPlaceId: any = null;
  editPlaceData: any = {};

  selection = new SelectionModel(true, []);
  nameFormControl = new FormControl('', [Validators.required, Validators.email]);

  gendergroup: Array<any> = [];
  agegroup: string[];
  servicetypes: string[];
  serviceplacetypes: string[];
  patientcategorytype: Array<any> = [];
  patientstatus: string[];
  agegroupcategory: string[];
  clinics: string[];
  facilitybranch: string[];
  maintype: string[];

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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder,
              private apiService: ApiService) { }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getUser();
    this.getFormOptions();

    this.serviceForm = this.fb.group({
      name: '',
      code: '',
      gendergroup: '',
      servicePlacePatientCategories: '',
      patientstatus: '',
      servicePlaceServicePlaceTypes: '',
      servicePlaceAgegroups: '',
      userServicePlaces: '',
      servicePlaceBranches: '',
      maintypes: '',
      headname: '',
      ServicePlaceServiceTypes: '',


    });
  }


  nextStep(row) {

    this.selectedIndex = this.selectedIndex + 1;
    this.fillForm(row);
  }

  previousStep() {

    this.selectedIndex = this.selectedIndex - 1;
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

  fillForm(data: any): void {
    console.log('fill form', data);
    this.serviceForm.reset();
    this.serviceForm.patchValue({
      name: data.name,
      code: data.code,
      gendergroup: data.gendergroup.id,
      servicePlacePatientCategories: data.id,
      patientstatus: data.patientstatus.id,
      servicePlaceServicePlaceTypes: data.id,
      servicePlaceAgegroups: data.id,
      userServicePlaces: data.id,
      servicePlaceBranches: data.id,
      maintypes: data.maintypes.id,
      headname: data.headname,
      ServicePlaceServiceTypes: data.id,

    });
    this.editPlaceData = data;
    this.editPlaceId = data.id;
    // const pIds = [];
    // data.servicePlacePatientCategories.foreach(x => {
    //   pIds.push(x);
    // })
    // servicePlacePatientCategories.map(x => x.patientcategoryid),
  }

  // stop here if form is invalid
  submitForm(): void {
    if (this.serviceForm.invalid) {
      return;
    }
  }
  updateUser(): void {
    const originalData = this.editPlaceData;
    // originalData.id =
    this.apiService.updateUser(originalData)
    .subscribe(
      data => {
        console.log( 'updating info', data);
      }
    );
  }
}
