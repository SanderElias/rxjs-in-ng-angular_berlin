import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmHomeComponent } from './vm-home/vm-home.component';
import { Routes, RouterModule } from '@angular/router';
import { PaintingComponent } from './painting/painting.component';

const routes: Routes = [{ path: '', component: VmHomeComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [VmHomeComponent, PaintingComponent]
})
export class ViewModelModule {}
