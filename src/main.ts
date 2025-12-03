import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { authInterceptorFn } from "./app/interceptors/auth.interceptor.fn";

import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  provideIonicAngular,
  IonApp,
  IonRouterOutlet,
} from "@ionic/angular/standalone";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    importProvidersFrom(IonicModule.forRoot({}), IonicStorageModule.forRoot()),
  ],
}).catch((err) => console.error(err));
