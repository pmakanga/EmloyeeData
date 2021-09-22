import { Department } from './../../_Interface/department';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  @ViewChild('closebutton') closebutton;

  @Input() emp: any;

  EmployeeId: string;
  EmployeeName: string;
  Department: string;
  DateOfJoining: string;
  PhotoFileName: string;
  PhotoFilePath: string;

  DepartmentList: any = [];

  ActivateAddEditEmpComp = false;
  // EmployeeList: any = [];

  ngOnInit(): void {

    this.loadDepartmentList();
  }

  loadDepartmentList = () => {
    this.service.getDepList().subscribe((data: any) => {
      this.DepartmentList = data;

      this.EmployeeId = this.emp.id;
      this.EmployeeName = this.emp.employeeName;
      this.Department = this.emp.department;
      this.DateOfJoining = this.emp.dateOfJoining;
      this.PhotoFileName = this.emp.photoFileName;
      this.PhotoFilePath =  this.service.photoUrl + this.emp.photoFileName;
    });
  }

  addEmployee = () => {
    const val = { EmployeeId: this.EmployeeId,
                  EmployeeName: this.EmployeeName,
                  Department: this.Department,
                  DateOfJoining: this.DateOfJoining,
                  PhotoFileName: this.PhotoFileName
                };
    this.service.addEmployee(val).subscribe(res => {
    });
  }

  updateEmployee = (emp) => {
    emp = { EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };


    this.service.updateEmployee(emp.EmployeeId, emp).subscribe(res => {
    });

  }

  uploadPhoto = (event) => {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    });
  }

}
