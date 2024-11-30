import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../../Servises/MainService/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: MainService,
    private router: Router
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

  addEmployee(): void {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        (response) => {
          Swal.fire('Success!', 'Employee added successfully!', 'success');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 400) {
            const errorMessage = error.error;
            if (errorMessage.includes('Email')) {
              Swal.fire('Error', 'This email is already exist.', 'error');
            } else if (errorMessage.includes('Phone')) {
              Swal.fire('Error', 'This phone number is already exist.', 'error');
            } else {
              Swal.fire('Error', 'Failed to create employee. Please try again.', 'error');
            }
          } else {
            Swal.fire('Error', 'Failed to create employee. Please try again.', 'error');
          }
        }
      );
    } else {
      Swal.fire('Error', 'Please fill out all required fields correctly.', 'error');
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  resetForm() {
    this.employeeForm.reset();
  }
}
