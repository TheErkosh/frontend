import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public students: Student[] = [];
  

  
  studentDetails = null as any;
  studentToUpdate: Student = {
    id: 0,
    name: '',
    surname: '',
    subject:'',
    studentCode:'',
    email: '',
    imageUrl: '',
    exam: 0,
    mark: ''
  };
  

  constructor(private studentService: StudentService) {
    this.getStudents();
  }


  getMarkColor(mark: string): string {
    if (mark === 'F') {
      return 'red'; // Color red for 'F' mark
    } else {
      return 'null'; // Default color for other marks
    }
  }

  private calculateMarks(students: Student[]): Student[] {
    return students.map(student => {
      return {
        ...student,
        mark: this.calculateMark(student.exam)
      };
    });
  }

  calculateMark(exam: number): string {
    if (exam >= 90) {
      return 'A';
    } else if (exam >= 75) {
      return 'B';
    } else if (exam >= 60) {
      return 'C';
    } else if (exam >= 50) {
      return 'D';
    } else {
      return 'F';
    }
  }

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


  



  deleteStudent(student: any) {
    this.studentService.deleteStudent(student.id).subscribe(
      (resp) => {
        console.log(resp);
        this.getStudents();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  edit(student: any){
    this.studentToUpdate = { ...student }; // Make a copy to avoid mutating the original object
}

updateStudent(){
    this.studentService.updateStudent(this.studentToUpdate).subscribe(
      (resp) => {
        console.log(resp);
        // After successful update, recalculate the mark
        this.studentToUpdate.mark = this.calculateMark(this.studentToUpdate.exam);
      },
      (err) => {
        console.log(err);
      }
    );
}

}
