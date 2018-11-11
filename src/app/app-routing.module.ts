import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomLoginComponent} from './components/room-login/room-login.component';
import {RoomComponent} from './components/room/room.component';

const routes: Routes = [
  { path: '', component: RoomLoginComponent},
  {path: 'room-login', component: RoomLoginComponent},
  {path: 'room', component: RoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
