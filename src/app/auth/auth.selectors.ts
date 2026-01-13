import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

export const selectUserEmail = createSelector(
  selectAuthState,
  state => state.email
);
