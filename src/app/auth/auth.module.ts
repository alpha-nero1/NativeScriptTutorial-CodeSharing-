import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from '@src/app/auth/auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingIndicatorModule } from '../shared/ui/loading-indicator/loading-indicator.module';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ]),
        RouterModule,
        ReactiveFormsModule,
        LoadingIndicatorModule
    ],
    exports: [
        AuthComponent
    ],
})
export class AuthModule {}
