import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ComposeComponent } from './compose/compose.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import {SentComponent} from './sent/sent.component'


import {BinComponent} from './bin/bin.component'
const routes: Routes = [
  {
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'sent',
    component: SentComponent
  },
  {
    path: 'bin',
    component: BinComponent
  },
  {
    path: 'read-mail',
    component: ReadMailComponent
  },
  {
    path: 'compose',
    component: ComposeComponent
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {}
