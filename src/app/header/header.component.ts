import { TokenStorageService } from './../_services/token-storage.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() userName: string = '';
  @Output() displayStyleForModel = new EventEmitter;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {}

  doLogout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getProfileDetails() {
    this.displayStyleForModel.emit('block');
    // this.displayStyleForModel = 'block';
  }
}
