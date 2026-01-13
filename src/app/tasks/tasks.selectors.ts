import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from './task.model';

export const selectTasksState =
  createFeatureSelector<Task[]>('tasks');

export const selectTasksByUser = (email: string) =>
  createSelector(
    selectTasksState,
    tasks => tasks.filter(t => t.userEmail === email)
  );
