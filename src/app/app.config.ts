import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer } from './auth/auth.reducer';
import { tasksReducer } from './tasks/tasks.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    // Enregistrer les slices de state (features)
    provideState('auth', authReducer),
    provideState('tasks', tasksReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
