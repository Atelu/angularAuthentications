import { User } from './../models/User';
import { ApiService } from './../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Serviceplace } from './../models/Serviceplace';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { first, map } from 'rxjs/operators';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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
  textPattern: any = '^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$';

  selection = new SelectionModel(true, []);
  nameFormControl = new FormControl('', [Validators.required, Validators.email]);
  @Output() savedPlace = new EventEmitter<any>();


  gendergroup: Array<any> = [];
  agegroup: Array<any> = [];
  servicetypes: Array<any> = [];
  serviceplacetypes: Array<any> = [];
  patientcategorytype: Array<any> = [];
  patientstatus: Array<any> = [];
  agegroupcategory: Array<any> = [];
  clinics: Array<any> = [];
  facilitybranch: Array<any> = [];
  maintype: Array<any> = [];

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
              private apiService: ApiService, private route: ActivatedRoute) { }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getUser();
    this.getFormOptions();


    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['',  Validators.pattern(this.textPattern)],
      gendergroupid: [null, Validators.required],
      servicePlacePatientCategories: [[], Validators.required],
      patientstatusid: [null, Validators.required],
      servicePlaceServicePlaceTypes: [[], Validators.required],
      servicePlaceAgegroups: [[], Validators.required],
      clinicserviceplaces: [[], Validators.required],
      servicePlaceBranches: [[], Validators.required],
      maintypeid: [null, Validators.required],
      headname: ['', [Validators.required]],
      ServicePlaceServiceTypes: [[], Validators.required],

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
      this.gendergroup = data[0].data.content ? data[0].data.content : [];
      this.agegroup = data[1].data.content ? data[1].data.content : [];
      this.servicetypes = data[2].data.content ? data[2].data.content : [];
      this.serviceplacetypes = data[3].data.content ? data[3].data.content : [];
      this.patientcategorytype = data[4].data.content ? data[4].data.content : [];
      this.clinics = data[5].data.content ? data[5].data.content : [];
      this.facilitybranch = data[6].data.content ? data[6].data.content : [];
      this.patientstatus = data[7].data.content ? data[7].data.content : [];
      this.maintype = data[8].data.content ? data[8].data.content : [];
      this.agegroupcategory = data[9].data.content ? data[9].data.content : [];
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

  fillForm(data): void {
    console.log('fill form', data);
    this.serviceForm.reset();
    this.serviceForm.patchValue({
      name: data.name,
      code: data.code,
      gendergroupid: data.gendergroupid,
      servicePlacePatientCategories: data.servicePlacePatientCategories.map(x => x.patientcategoryid),
      patientstatusid: data.patientstatusid,
      servicePlaceServicePlaceTypes: data.servicePlaceServicePlaceTypes.map(x => x.serviceplacetypeid),
      agegroupcategoryid: data.agegroupcategoryid,
      agegroupid: data.agegroupid,
      clinicserviceplaces: data.clinicserviceplaces.map(x => x.clinicid),
      servicePlaceAgegroups: data.servicePlaceAgegroups.map(x => x.agegroupid),
      servicePlaceBranches: data.servicePlaceBranches.map(x => x.branchid),
      maintypeid: data.maintypeid,
      headname: data.headname,
      ServicePlaceServiceTypes: data.servicePlaceServiceTypes.map(x => x.servicetypeid),

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

  clearForm(): void {
    this.serviceForm.reset();
  }

  save(): void {
    if (this.serviceForm.invalid) {
      Object.keys(this.serviceForm.controls).forEach((controlName) => {
        this.serviceForm.controls[controlName].markAsTouched({ onlySelf: true });
      });
      alert('Complete the form, The form contains errors');

      this.savedPlace.emit({ success: false });
      return;
    } else {

      alert('Saving');

      const placeData = _.cloneDeep(this.serviceForm.value);
      // extract ids for multi-select
      console.log(placeData);
      placeData.servicePlacePatientCategories = this.serviceForm.value.servicePlacePatientCategories.map(x => {
        return { patientcategoryid: x };
      });

      placeData.servicePlaceServicePlaceTypes = this.serviceForm.value.servicePlaceServicePlaceTypes.map(x => {
        return { serviceplacetypeid: x };
      });

      placeData.servicePlaceAgegroups = this.serviceForm.value.servicePlaceAgegroups.map(x => {
        return { agegroupid: x };
      });

      placeData.clinicserviceplaces = this.serviceForm.value.clinicserviceplaces.map(x => {
        return { clinicid: x };
      });

      placeData.servicePlaceBranches = this.serviceForm.value.servicePlaceBranches.map(x => {
        return { branchid: x };
      });

      placeData.servicePlaceServicePlaceTypes = this.serviceForm.value.servicePlaceServicePlaceTypes.map(x => {
        return { serviceplacetypeid: x };
      });

      if (!this.editPlaceId) {
        // console.log('New Place');
        this.saveNew(placeData);
    } else {

      placeData.id = this.editPlaceId;
      this.update(placeData);
    }
    }
  }

  saveNew(place): void {
    console.log('Saving New place ', place);
    this.apiService.saveUser(place)
      .subscribe(
        data => {
          console.log('Saving New place ', place);
          this.clearForm();
          this.apiService.addedOrUpdated$$.next(data.data[0]);


        });
  }
  update(place): void {
    const originalData = this.editPlaceData;
    Object.keys(originalData).forEach((key) => {
      if (place[key]) { originalData[key] = place[key]; }
    });
    this.apiService.updateUser(originalData)
     .subscribe(
        data => {
          console.log('updating info', data);
           // to reflect changes in table
          this.apiService.addedOrUpdated$$.next(data.data[0]);
          this.clearForm();
        }
      );
  }
}
