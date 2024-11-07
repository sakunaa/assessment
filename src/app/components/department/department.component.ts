import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../Services/Employee.service';

interface IDepartment {
  departmentId: number;
  name: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.Scss',
})
export class DepartmentComponent {
  department: IDepartment[] = [];

  visible: boolean = false;
  departmentForm: FormGroup;
  data = {
    "type": "string",
    "currentPage": 1,
    "pageSize": 1000,
    "parameters": [],
    "orderBy": "string",
    "sortBy": "string",
    "sortOrder": "string"
  }

  constructor(
    private fb: FormBuilder,
    private _departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      departmentId:null,
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchList();
  }

  fetchList() {
    this._departmentService.getItems(this.data).subscribe(
      (response: any) => {
        this.department = response?.data.data
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  showDialog() {
    this.departmentForm.reset();
    this.visible = !this.visible;

  }

  submitDepartment() {
    if (this.departmentForm.valid) {
      console.log(this.departmentForm.value)
      if(this.departmentForm.value.departmentId==null||this.departmentForm.value.departmentId==0){
        this._departmentService.create(
          {
          name:this.departmentForm.value.name,
          departmentId:0
          }
        ).subscribe(
          (response: any) => {
           console.log(response)
           this.fetchList()
          },
          error => {
            console.error('Error:', error);
          }
        );
      }else{
        this._departmentService.updateItem(this.departmentForm.value).subscribe(
          (response: any) => {
           console.log(response)
           this.fetchList()
          },
          error => {
            console.error('Error:', error);
          }
        );
      }
      this.showDialog()
    }
  }

  handleEdit(data: IDepartment) {
    debugger
    this.departmentForm.patchValue({
      departmentId: data.departmentId,
      name: data.name,
    });
    this.visible = true
  }

  handleDelete(id:any) {
    this._departmentService.deleteItem(id).subscribe(
      (response: any) => {
       console.log(response)
       this.fetchList()
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

}
