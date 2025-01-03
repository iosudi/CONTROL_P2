import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule } from '@ngx-translate/core';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, SharedModule, TranslateModule],
})
export class NotFoundModule {}
