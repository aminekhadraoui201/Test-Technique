import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../task.model';
import * as TasksActions from '../tasks.actions';
import { v4 as uuidv4 } from 'uuid';
import { selectUserEmail } from '../../auth/auth.selectors';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
})
export class TaskForm implements OnInit, OnChanges {
  @Input() existingTask?: Task;
  @Output() saved = new EventEmitter<void>();

  form!: ReturnType<FormBuilder['group']>;
  userEmail!: string;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    // Initialisation du formulaire
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      dueDate: ['', Validators.required]
    });

    // Récupérer l’email connecté depuis le Store
    this.store.select(selectUserEmail).subscribe(email => {
      if (email) this.userEmail = email;
    });

    // Pré-remplir le formulaire si édition
    if (this.existingTask) {
      this.form.patchValue(this.existingTask);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['existingTask'] && this.existingTask) {
      this.form.patchValue(this.existingTask);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const task: Task = {
      id: this.existingTask?.id || uuidv4(),
      title: this.form.value.title!,
      description: this.form.value.description || '',
      priority: this.form.value.priority!,
      dueDate: this.form.value.dueDate!,
      completed: this.existingTask?.completed || false,
      userEmail: this.userEmail
    };

    if (this.existingTask) {
      this.store.dispatch(TasksActions.updateTask({ task }));
    } else {
      this.store.dispatch(TasksActions.addTask({ task }));
    }

    // Réinitialiser le formulaire
    this.form.reset({ priority: 3 });
    this.saved.emit();
  }
}