// Decorators
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../core/shared/shared.module';
import { GroceryRoutingModule } from './grocery-routing.module';

// Components
import { GroceryCreateComponent } from './grocery-create/grocery-create.component';
import { GroceryEditComponent } from './grocery-edit/grocery-edit.component';
import { GroceryDeleteComponent } from './grocery-delete/grocery-delete.component';
import { GroceryDetailsComponent } from './grocery-details/grocery-details.component';
import { GroceryStoreComponent } from './grocery-store/grocery-store.component';

@NgModule({
  declarations: [
    GroceryCreateComponent,
    GroceryEditComponent,
    GroceryDeleteComponent,
    GroceryDetailsComponent,
    GroceryStoreComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    GroceryRoutingModule
  ],
})
export class GroceryModule { }
