import { IssuedBookLogsService } from './../_services/issued-book-logs.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { BookService } from './../_services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

const ROLE_ADMIN = 1;
const ROLE_BOOK_KEEPER = 2;
const ROLE_BOOK_CARE_TAKER = 3;

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
  addIssuedBookDetailsForm: any;
  submitted = false;
  toaster: ToastrService;
  errorMessage = '';
  gridData: any = [];
  totalBooksArray: any = [];
  hiddenId: any;
  userDetails: any;
  userName: string = '';
  totalBookQuantity: number = 0;
  totalBookQuantityArray: number[] = [];
  issueBookButtonTitle: String = 'Issue book(s)';
  userRole: number = 0;

  addBookFormData = {
    id: '',
    book_name: '',
    description: '',
    price: '',
    quantity: '',
  };

  addIssuedBookLogsFormData = {
    id: '',
    book_name: '',
    issuer_id: '',
    issuer_name: '',
    user_name: '',
    user_address: '',
    user_phone_number: '',
    user_email: '',
    notes: '',
    issued_quantity: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    toaster: ToastrService,
    private BookService: BookService,
    private tokenStorage: TokenStorageService,
    private issuedBookLogsService: IssuedBookLogsService
  ) {
    this.toaster = toaster;
  }

  ngOnInit(): void {
    this.userDetails = this.tokenStorage.getUser();
    this.userRole = this.userDetails.user.role;
    this.getBookDetails();
    if (this.userDetails.user.role == ROLE_ADMIN) {
      this.addBookDetailsForm = this.formBuilder.group({
        book_name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
      });
    } else {
      this.getIssuedBookLogs();
      this.addIssuedBookDetailsForm = this.formBuilder.group({
        book_id: '',
        book_name: '',
        user_name: ['', Validators.required],
        user_address: ['', Validators.required],
        user_phone_number: ['', Validators.required],
        user_email: ['', Validators.required],
        notes: ['', Validators.required],
        issued_quantity: ['', Validators.required],
      });
    }
    this.userName = this.userDetails.user.name;
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
    if (this.userRole == ROLE_ADMIN) {
      this.addBookDetailsForm.reset();
      this.buttonTitle = 'Add Book Details';
    } else {
      this.buttonTitle = 'Update Status';
    }
    this.action = 'insert';
  }

  get f() {
    return this.userDetails.user.role == ROLE_ADMIN
      ? this.addBookDetailsForm.controls
      : this.addIssuedBookDetailsForm.controls;
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
        this.gridData = this.totalBooksArray = data.data.data;
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
      (error) => {
        this.toaster.error('Something is wrong');
      }
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

  getTotalQuantityOfBook() {
    let selectedBookId = parseInt(this.addIssuedBookLogsFormData.id);

    this.BookService.getBookDetailsById(selectedBookId).subscribe(
      (data) => {
        if (data.success) {
          this.totalBookQuantityArray = [];
          data = data.data.data[0];
          this.totalBookQuantity = data.quantity;
          for (var i = 1; i <= this.totalBookQuantity; i++) {
            this.totalBookQuantityArray.push(i);
          }
        }
      },
      (error) => {
        this.toaster.error('Something is wrong');
      }
    );
  }

  addIssuedBookLogs(): void {
    this.submitted = true;
    if (this.addIssuedBookDetailsForm.invalid) {
      this.toaster.error('All fields are required.');
      return;
    }

    let data = {
      book_id: this.addIssuedBookLogsFormData.id,
      book_name: this.addIssuedBookLogsFormData.book_name,
      issuer_id: this.userDetails.user.id,
      issuer_name: this.userDetails.user.name,
      user_name: this.addIssuedBookDetailsForm.user_name,
      user_address: this.addIssuedBookDetailsForm.user_address,
      user_phone_number: this.addIssuedBookDetailsForm.user_phone_number,
      user_email: this.addIssuedBookDetailsForm.user_email,
      notes: this.addIssuedBookDetailsForm.notes,
      issued_quantity: this.addIssuedBookDetailsForm.issued_quantity,
    };

    this.issuedBookLogsService.addIssuedBookLogs(data).subscribe(
      (data) => {
        if (data.success) {
          this.toaster.success(data.message);
          this.closePopup();
          this.getIssuedBookLogs();
          return;
        }
      },
      (error) => {
        this.closePopup();
        this.toaster.error(error.message);
      }
    );
  }

  getIssuedBookLogs() {
    this.issuedBookLogsService.getIssuedBookLogs().subscribe(
      (data) => {
        this.gridData = data.data.data;
      },
      (error) => {
        this.toaster.error('Something is wrong');
      }
    );
  }

  editIssuedBookLog(id: number) {
    this.issuedBookLogsService.getBookLogsById(id).subscribe(
      (data) => {
        if (data.success) {
          data = data.data.data;
          this.action = 'update';
          this.addIssuedBookLogsFormData = {
            id: '',
            book_name: '',
            issuer_id: '',
            issuer_name: '',
            user_name: data.user_name,
            user_address: data.user_address,
            user_phone_number: data.user_phone_number,
            user_email: data.user_email,
            notes: data.notes,
            issued_quantity: data.issued_quantity,
          };
          this.openPopup();
        }
      },
      (error) => {
        this.toaster.error('Something is wrong');
      }
    );
  }
}
