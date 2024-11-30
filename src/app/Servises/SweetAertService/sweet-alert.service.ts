import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  success(message: string, title: string = 'Success!') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  error(message: string, title: string = 'Error!') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  warning(message: string, title: string = 'Warning!') {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  confirmDelete(message: string = 'Are you sure you want to delete?', confirmButtonText: string = 'Yes, delete it!'): Promise<boolean> {
    return Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

}
