import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../Models/InterFace/IEmployee';
import { MainService } from '../../Servises/MainService/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: IEmployee = { id: '', firstName: '', lastName: '', email: '', phone: '', salary: 0, department: '' };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: MainService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.maxLength(100)]], 
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      salary: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*\.?[0-9]+$/)]],
      department: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.loadEmployeeData(employeeId);
    } else {
      Swal.fire('Employee ID is missing in the route');
    }
  }

  loadEmployeeData(id: string): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.employeeForm.patchValue(this.employee); 
      },
      error: (err) => {
        Swal.fire('Failed to load employee data. Please try again later.');
      },
    });
  }

  updateEmployee(): void {
    if (this.employee.id) {
      if (this.employeeForm.valid) {
        const updatedEmployee = { ...this.employeeForm.value, id: this.employee.id };
        this.employeeService.updateEmployee(updatedEmployee).subscribe({
          next: () => {
            Swal.fire('Success!', 'Employee updated successfully!', 'success');  
            this.router.navigate(['/']); 
          },
          error: (error) => {
            console.error('Error response:', error);  
            
            if (error.status === 400) {
              const errorMessage = error.error?.message || error.error || 'Unknown error';  
              if (typeof errorMessage === 'string') {
                if (errorMessage.includes('Email')) {
                  Swal.fire('Error', 'This email is already in use.', 'error'); 
                }
                else if (errorMessage.includes('Phone')) {
                  Swal.fire('Error', 'This phone number is already in use.', 'error'); 
                } else {
                  Swal.fire('Error', 'Failed to update employee. Please try again later.', 'error');
                }
              } else {
                Swal.fire('Error', 'Failed to update employee. Please try again later.', 'error');
              }
            } else {
              Swal.fire('Error', 'Failed to update employee. Please try again later.', 'error'); 
            }
          },
        });
      } else {
        this.errorMessage = 'Please fill out all required fields correctly.';
        Swal.fire('Error', this.errorMessage, 'error');
      }
    } else {
      Swal.fire('Employee ID is missing');
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  resetForm() {
    this.employeeForm.reset();
  }
}
