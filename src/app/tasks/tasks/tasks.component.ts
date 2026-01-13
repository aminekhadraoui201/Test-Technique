import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { selectUserEmail } from '../../auth/auth.selectors';
import { selectTasksByUser } from '../tasks.selectors';
import * as TasksActions from '../tasks.actions';
import { TaskForm } from '../task-form/task-form.component';
import * as AuthActions from '../../auth/auth.actions';



@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskForm],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css'],
})
export class TasksComponent {
  tasks$!: Observable<Task[]>;
  email!: string;
  editingTask?: Task;

  constructor(private store: Store ,
    private router: Router) {
    this.store.select(selectUserEmail).subscribe(email => {
      if (email) {
        this.email = email;
        this.tasks$ = this.store.select(selectTasksByUser(email));
      }
    });
  }

  toggle(id: string) {
    this.store.dispatch(TasksActions.toggleTask({ id }));
  }

  delete(id: string) {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  edit(task: Task) {
    this.editingTask = task;
  }

  clearEditing() {
    this.editingTask = undefined;
  }
  logout() {
    this.store.dispatch(AuthActions.logout());
    this.store.dispatch(TasksActions.clearTasks());
    this.router.navigate(['/']);
  }
}