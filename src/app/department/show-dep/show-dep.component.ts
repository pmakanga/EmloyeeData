import { SharedService } from './../../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: SharedService) { }

  DepartmentList: any = [];

  ModalTitle: string;
  ActivateAddEditDepComp = false;
  dep: any;

  DepartmentIdFilter = '';
  DepartmentNameFilter = '';
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick = () => {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ''
    };

    this.ModalTitle = 'Add Department';
    this.ActivateAddEditDepComp = true;
  }

  editClick = (item) => {
    this.dep = item;
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditDepComp = true;
  }

  deleteClick = (item) => {
    console.log(item.id);
    if (confirm('Are you sure??')) {
      this.service.deleteDepartment(item.id).subscribe(data => {
        this.refreshDepList();
      });
    }
  }

  closeClick = () => {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  refreshDepList = () => {
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    });
  }

  FilterFn = () => {
    const DepartmentIdFilter = this.DepartmentIdFilter;
    const DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter((el) => {
      return el.id.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      ) &&
      el.departmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      );
    });
  }

  sortResult = (prop, asc) => {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort((a, b) => {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b [prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a [prop]) ? -1 : 0);
      }
    });
  }

}
