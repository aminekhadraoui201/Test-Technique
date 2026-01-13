import { createAction, props } from '@ngrx/store';
import { Task } from './task.model';

export const addTask = createAction(
  '[Tasks] Add',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Tasks] Update',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete',
  props<{ id: string }>()
);

export const toggleTask = createAction(
  '[Tasks] Toggle',
  props<{ id: string }>()
);

export const clearTasks = createAction('[Tasks] Clear');
