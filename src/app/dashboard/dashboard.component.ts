import { TokenStorageService } from './../_services/token-storage.service';
import { BookService } from './../_services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayStyle: string = 'none';
  buttonTitle: string = 'Add Book Details';
  action: string = 'insert';
  addBookDetailsForm: any;
  submitted = false;
  toaster: ToastrService;
  errorMessage = '';
  gridData = [];
  hiddenId: any;
  userDetails: any;
  userName: string = '';

  addBookFormData = {
    id: '',
    book_name: '',
    description: '',
    price: '',
    quantity: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    toaster: ToastrService,
    private BookService: BookService,
    private tokenStorage: TokenStorageService
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
    this.userDetails = this.tokenStorage.getUser();
    this.userName = this.userDetails.user.name;
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.addBookDetailsForm.reset();
    this.buttonTitle = 'Add Book Details';
    this.action = 'insert';
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

  editBookDetails(id: any) {
    this.BookService.getBookDetailsById(id).subscribe(
      (data) => {
        if (data.success) {
          data = data.data.data[0];
          this.buttonTitle = 'Update Book Details';
          this.action = 'update';
          this.addBookFormData = {
            id: data.id,
            book_name: data.book_name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
          };
          this.openPopup();
        }
      },
      (error) => {}
    );
  }

  deleteBookDetails(id: any) {
    Swal.fire({
      title: 'Are you sure want to DELETE?',
      text: 'You will not be able to recover this book again!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.BookService.deleteBookDetails(id).subscribe(
          (data) => {
            if (data.success) {
              this.getBookDetails();
              this.toaster.success(data.message);
              Swal.fire(
                'Deleted!',
                'Your book details are deleted successfully.',
                'success'
              );
            }
          },
          (error) => {
            this.toaster.error('Something is wrong');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your book details are safe :)', 'error');
      }
    });
  }

  updateBookDetails(): void {
    this.submitted = true;
    if (this.addBookDetailsForm.invalid) {
      this.toaster.error('All fields are required.');
      return;
    }

    this.BookService.updateBookDetails(this.addBookFormData).subscribe(
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
}
