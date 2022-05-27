import { GetUserDetailsService } from './get-user-details.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { GridModule } from '@progress/kendo-angular-grid';
import { GetBookStatusPipe } from './_pipes/get-book-status.pipe';

// export function getUserDetails(getUserDetailsService: GetUserDetailsService) {
//   return () => getUserDetailsService.init();
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    PageNotFoundComponent,
    GetBookStatusPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GridModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (getUserDetailsService: GetUserDetailsService) =>
        () => getUserDetailsService.init(),
      deps: [GetUserDetailsService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
