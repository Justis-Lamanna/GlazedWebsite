import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  @ViewChild('loginModal') public loginModal: ModalDirective;
  constructor(private router: Router) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.loginModal.show();
  }

  onClose(){
    this.router.navigateByUrl('home');
  }

  onSubmit(){
    this.router.navigateByUrl('dashboard');
  }
}
