import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // displayStyle: string = 'none';
  @Input() displayStyle: string = 'block';

  constructor() { }

  ngOnInit(): void {
    // this.displayStyle = 'block';
  }
}
