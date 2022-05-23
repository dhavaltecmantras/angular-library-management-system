import { TokenStorageService } from './../_services/token-storage.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() userName: string = '';
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {}

  doLogout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
