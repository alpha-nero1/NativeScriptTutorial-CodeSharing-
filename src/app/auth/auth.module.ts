import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ]),
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        AuthComponent
    ],
})
export class AuthModule {}
