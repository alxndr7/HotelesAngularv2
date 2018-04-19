import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { ReportesRoutes } from './reportes.routing';
import { ReporteDiarioRelevoComponent } from './reporteDiarioRelevo/reporteDiarioRelevo.component';
import {FilterPipe} from './utils/FilterPipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportesRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      FilterPipe,
      ReporteDiarioRelevoComponent
  ]
})

export class ReportesModule {}
