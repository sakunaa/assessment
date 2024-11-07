import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


interface IFieldList{
  name:string,
  type:string
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  fieldlist: any[] = [{ name: '', type: 'text' }];
  submittedData: any[] = [];
  typeOptions = ['text', 'date', 'number', 'file'];

  addField(): void {
    this.fieldlist.push({ name: '', type: 'text' });
  }

  removeField(index: number): void {
    this.fieldlist.splice(index, 1);
  }

  onSubmit(): void {
    this.submittedData = [...this.fieldlist.map(field => ({ ...field }))];
  }

  onSubmitSecondForm(): void {
    console.log(this.submittedData);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.submittedData[index].fileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
