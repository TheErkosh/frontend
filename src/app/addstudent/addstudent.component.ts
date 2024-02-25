import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { NgForm } from '@angular/forms';
import { Student } from '../model/student';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent  implements OnInit{




  public students: Student[] = [];




  constructor(private studentService: StudentService) {}




  ngOnInit(): void {
    this.getStudents();
  }
  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
        console.log(this.students);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onAddStudent(addForm: NgForm): void {
    const addStudentForm = document.getElementById('add-student-form');
    if (addStudentForm) {
      addStudentForm.click();
    }
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

}
