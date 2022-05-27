import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetUserDetailsService {
  constructor(
    // private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private tokenStorage: TokenStorageService,
  ) {}

  init() {
    this.userService.getUserDetails().subscribe(
      (data) => {
        if (!data.user && !data.success) {
          this.router.navigate(['/login']);
          this.tokenStorage.signOut();
        }
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }
}
