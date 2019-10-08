import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild([
            { path: '', component: AuthComponent }
        ]),
        NativeScriptRouterModule,
        ReactiveFormsModule
    ],
    exports: [
        AuthComponent
    ],
})
export class AuthModule {}
