import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

const itemsList = [
  {
    label: 'Department',
    icon: 'pi pi-home',
    routerLink: '/department'
  },
  {
    label: 'Employee',
    icon: 'pi pi-th-large',
    routerLink: '/employee'
  },
  {
    label: 'Dynamic Form',
    icon: 'pi pi-file-plus',
    routerLink: '/dynamic-form'
  },
]

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.Scss'
})
export class MenuComponent {
  items: MenuItem[] = itemsList;
  ngOnInit() { }
}
