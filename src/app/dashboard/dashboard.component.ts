import { BookService } from './../_services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayStyle: string = 'none';
  addBookDetailsForm: any;
  submitted = false;
  toaster: ToastrService;
  errorMessage = '';
  gridData = [];
  addBookFormData = {
    book_name: '',
    description: '',
    price: '',
    quantity: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    toaster: ToastrService,
    private BookService: BookService
  ) {
    this.toaster = toaster;
  }

  ngOnInit(): void {
    this.addBookDetailsForm = this.formBuilder.group({
      book_name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.getBookDetails();
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.addBookDetailsForm.reset();
  }

  get f() {
    return this.addBookDetailsForm.controls;
  }

  addBookDetails(): void {
    this.submitted = true;
    if (this.addBookDetailsForm.invalid) {
      this.toaster.error('All fields are required.');
      return;
    }

    this.BookService.addBookDetails(this.addBookFormData).subscribe(
      (data) => {
        if (data.success) {
          this.toaster.success(data.message);
          this.closePopup();
          this.getBookDetails();
          return;
        }
      },
      (error) => {
        this.closePopup();
        this.toaster.error(error.message);
      }
    );
  }

  getBookDetails(): void {
    this.BookService.getBookDetails().subscribe(
      (data) => {
        this.gridData = data.data.data;
      },
      (error) => {
        this.toaster.error('Something is wrong');
      }
    );
  }
}
