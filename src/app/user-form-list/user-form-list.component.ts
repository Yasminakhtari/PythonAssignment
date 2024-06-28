import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './user-form-list.component.html',
  styleUrl: './user-form-list.component.scss'
})
export class UserFormListComponent {
  students: any;
  // student: any;
  // students: Student[] = [];

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getStudents().subscribe(
      data => {
        this.students = data;
        console.log(this.students);
      },
      error => {
        console.error('Error fetching students', error);
      }
    );
  }

  deleteStudent(id: number): void {
    this.userService.deleteStudent(id).subscribe(
      () => {
        this.students = this.students.filter((student: { id: number; }) => student.id !== id);
      },
      error => {
        console.error('Error deleting student', error);
      }
    );
  }
  editStudent(id: number): void {
    this.router.navigateByUrl(`/user-form/${id}`);
  }
}
