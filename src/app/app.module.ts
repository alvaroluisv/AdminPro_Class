import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modules
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
