import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  email: string | null;
}

const initialState: AuthState = {
  email: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { email }) => ({ ...state, email })),
  on(AuthActions.logout, () => initialState)
);
