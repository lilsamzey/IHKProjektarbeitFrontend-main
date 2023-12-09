import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailRoutingModule } from './email-routing.module';
import { ComposeComponent } from './compose/compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MailsideComponent } from './mailside/mailside.component';

import {EmailserviceService} from '../email/emailservice.service';
import { SentComponent } from './sent/sent.component';
import { BinComponent } from './bin/bin.component'




//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [

    ComposeComponent,
    InboxComponent,
    ReadMailComponent,
    MailsideComponent,
    SentComponent,
    BinComponent,


  ],




  imports: [
    CommonModule,
    EmailRoutingModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
  ],


  providers: [EmailserviceService, ComposeComponent]

})
export class EmailModule {}
