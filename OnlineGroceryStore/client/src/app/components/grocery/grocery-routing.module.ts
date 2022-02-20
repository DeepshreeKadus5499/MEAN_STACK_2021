// Decorators
import { NgModule } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';

// Components
import { GroceryCreateComponent } from './grocery-create/grocery-create.component';
import { GroceryEditComponent } from './grocery-edit/grocery-edit.component';
import { GroceryDeleteComponent } from './grocery-delete/grocery-delete.component';
import { GroceryDetailsComponent } from './grocery-details/grocery-details.component';
import { GroceryStoreComponent } from './grocery-store/grocery-store.component';

// Guards
import { IsAdminGuard } from '../../core/guards/is-admin.guard';

const groceryRoutes: Routes = [
  {
    path: '',
    redirectTo: 'store/default',
    pathMatch: 'full'
  },
  {
    path: 'store/:query',
    component: GroceryStoreComponent
  },
  {
    path: 'details/:groceryId',
    component: GroceryDetailsComponent
  },
  {
    path: 'create',
    canActivate: [IsAdminGuard],
    component: GroceryCreateComponent
  },
  {
    path: 'edit/:groceryId',
    canActivate: [IsAdminGuard],
    component: GroceryEditComponent
  },
  {
    path: 'delete/:groceryId',
    canActivate: [IsAdminGuard],
    component: GroceryDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(groceryRoutes)],
  exports: [RouterModule]
})
export class GroceryRoutingModule { }
