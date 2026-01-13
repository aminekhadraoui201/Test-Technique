import { Routes } from '@angular/router';
import { AuthComponent    } from './auth/auth/auth.component';
import { TasksComponent } from './tasks/tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'tasks', component: TasksComponent }
];
