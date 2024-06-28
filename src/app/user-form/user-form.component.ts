import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  studentForm!: FormGroup ;
  id:any;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: [''],
      email: [''],
      date_of_birth: [''],
      address: [''],
      phone_number: [''],
      // file_upload: [null]
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.userService.getStudent(this.id).subscribe(
        data => {
          this.studentForm.patchValue(data);
        },
        error => {
          console.error('Error fetching student', error);
        }
      );
    }
  }


  onSubmit(): void {
    if (this.id) {
      this.userService.updateStudent(this.id, this.studentForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'User updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/user-form-list']);
          });
        },
        (error) => {
          console.error('Error updating student', error);
        }
      );
    } else {
      this.userService.addStudent(this.studentForm.value).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'User added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/user-form-list']);
          });
        },
        (error) => {
          console.error('Error adding student', error);
        }
      );
    }
  }

}
