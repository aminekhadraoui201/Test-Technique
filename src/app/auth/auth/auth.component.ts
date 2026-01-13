import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../auth.actions';
import * as TasksActions from '../../tasks/tasks.actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
    styleUrls: ['./auth.component.css'],   
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  form!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  login() {
    if (this.form.valid) {
      const email = this.form.value.email!;
      this.store.dispatch(AuthActions.login({ email }));
      this.router.navigate(['/tasks']);
    }
  }
  logout() {
  this.store.dispatch(AuthActions.logout());
  this.store.dispatch(TasksActions.clearTasks());
  this.router.navigate(['/']);
}
}
