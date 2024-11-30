import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../Models/InterFace/IEmployee';
import { MainService } from '../../Servises/MainService/main.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SweetAlertService } from '../../Servises/SweetAertService/sweet-alert.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employees: IEmployee[] = [];

  constructor(private employeeService: MainService, private sweetalert: SweetAlertService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    }, (error) => {
      this.sweetalert.error('Failed to load employees. Please try again.');
    });
  }

  deleteEmployee(id: string): void {
    this.sweetalert.confirmDelete('Are you sure you want to delete this employee?').then((result) => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.sweetalert.success('Employee deleted successfully');
            this.loadEmployees();
          },
          error: (err) => {
            console.error('Failed to delete employee:', err);
            this.sweetalert.error('Failed to delete employee. Please try again.');
          },
        });
      }
    });
  }
}
