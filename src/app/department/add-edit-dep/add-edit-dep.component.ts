
import { SharedService } from './../../shared.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../_Interface/employee';
import { Department } from 'src/app/_Interface/department';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service: SharedService) { }
  @ViewChild('closebutton') closebutton;

  @Input() dep: any;
  DepartmentId: string;
  DepartmentName: string;

  ActivateAddEditDepComp = false;
  DepartmentList: any = [];

  ngOnInit(): void {
    this.DepartmentId = this.dep.id;
    this.DepartmentName = this.dep.departmentName;
  }

  addDepartment = () => {
    const val = { DepartmentId: this.DepartmentId,
                  DepartmentName: this.DepartmentName
                };
    this.service.addDepartment(val).subscribe(res => {
    });
  }

  updateDepartment = (dep) => {
    dep = { DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };


    this.service.updateDepartment(dep.DepartmentId, dep).subscribe(res => {
    });

  }


  // unloadForm = () => {
  //   this.ActivateAddEditDepComp = false;
  //   this.refreshDepList();
  // }

  // refreshDepList = () => {
  //   this.service.getDepList().subscribe(data => {
  //     console.log(data);
  //     this.DepartmentList = data;
  //   });
  // }

}
