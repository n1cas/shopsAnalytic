import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private readonly auth: AuthService
  ){}

  ngOnInit(): void {
    
    const pitentialToken = localStorage.getItem('auth-token');
    if (pitentialToken !== null) {
      this.auth.setToken(pitentialToken);
    }
  }
}
