import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/Department.service';
import { DepartmentService } from '../../Services/Employee.service';

interface IEmployee {
  employeeId: number;
  Name: string;
  dateOfBirth:string;
  departmentId:number;
  managerId:number;
  salary:string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employee: IEmployee[] = [];
  departmentDropDown: any[] =[];
  visible: boolean = false;
  employeeForm: FormGroup;
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
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
  )
  {
    this.employeeForm = this.fb.group({
      employeeId: 0,
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      departmentId: ['', Validators.required],
      managerId: [],
      salary: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchList();
    this.fetchDropDownData()
   }

   fetchDropDownData() {
    this._departmentService.getItems(this.data).subscribe(
      (response: any) => {
        this.departmentDropDown = response?.data.data
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  fetchList() {
    this._employeeService.getItems(this.data).subscribe(
      (response: any) => {
        this.employee = response?.data.data
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  showDialog() {
    this.employeeForm.reset();
    this.visible = !this.visible;
  }

  submit() {
    if (this.employeeForm.valid) {
      if(this.employeeForm.value.employeeId==null||this.employeeForm.value.employeeId==0){
        const data ={
          "employeeId": 0,
          "name": this.employeeForm.value.name,
          "dateOfBirth": this.employeeForm.value.dateOfBirth.toISOString(),
          "departmentId": Number(this.employeeForm.value.departmentId),
          "managerId": Number(this.employeeForm.value.managerId),
          "salary": Number(this.employeeForm.value.salary)
        }
        this._employeeService.create(data).subscribe(
          (response: any) => {
           console.log(response)
           this.fetchList()
          },
          error => {
            console.error('Error:', error);
          }
        );
      }else{
        const data ={
          "employeeId":this.employeeForm.value.employeeId ,
          "name": this.employeeForm.value.name,
          "dateOfBirth": this.employeeForm.value.dateOfBirth.toISOString(),
          "departmentId": Number(this.employeeForm.value.departmentId),
          "managerId": Number(this.employeeForm.value.managerId),
          "salary": Number(this.employeeForm.value.salary)
        }
        debugger
        this._employeeService.updateItem(data).subscribe(
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

  handleEdit(data:any){
    debugger
    this.employeeForm.patchValue({
      employeeId: data.employeeId,
      name:data.name,
      dateOfBirth:new Date(data.dateOfBirth),
      departmentId:data.departmentId,
      managerId:data.managerId,
      salary:data.salary
    });
    this.employeeForm.value
    this.visible=true
  }

  handleDelete(id:any){
    this._employeeService.deleteItem(id).subscribe(
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
