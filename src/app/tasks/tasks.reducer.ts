import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from './task.model';

export const tasksReducer = createReducer(
  [] as Task[],

  on(TasksActions.addTask, (state, { task }) => [...state, task]),

  on(TasksActions.updateTask, (state, { task }) =>
    state.map(t => t.id === task.id ? task : t)
  ),

  on(TasksActions.deleteTask, (state, { id }) =>
    state.filter(t => t.id !== id)
  ),

  on(TasksActions.toggleTask, (state, { id }) =>
    state.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  ),

  on(TasksActions.clearTasks, () => [])
);
