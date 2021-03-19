import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<boolean>();
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  username = null;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  
  onSubmit(): void {
    const { username, password } = this.profileForm.value;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.username = this.tokenStorage.getUser().username;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.emitLogginStatus(true);
        this.profileForm.reset();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  emitLogginStatus(value: boolean) {
    this.loggedIn.emit(value);
  }

  logOut(): void {
    this.tokenStorage.signOut();
    this.username = null;
    this.isLoggedIn = false;
    this.isLoginFailed = false;
    this.emitLogginStatus(false);
  }

  reloadPage(): void {
    window.location.reload();
  }
}

