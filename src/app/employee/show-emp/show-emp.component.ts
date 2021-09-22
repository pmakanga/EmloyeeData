import { Department } from './../../_Interface/department';
import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  EmployeeList: any [];

  ModalTitle: string;

  ActivateAddEditEmpComp = false;

  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick = () => {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png'
    };

    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  editClick = (item) => {
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick = (item) => {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.id).subscribe(data => {
        this.refreshEmpList();
      });
    }
  }

  closeClick = () => {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList = () => {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
    });
  }

}
