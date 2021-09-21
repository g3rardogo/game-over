import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { GameService } from './services/game.service';
import { LibraryService } from './services/library.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryTableComponent } from './library-table/library-table.component';
import { GameTableComponent } from './game-table/game-table.component';
import { GameDialogComponent } from './game-dialog/game-dialog.component';

@NgModule({
  declarations: [AppComponent, LibraryTableComponent, GameTableComponent, GameDialogComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
  ],
  providers: [GameService, LibraryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
