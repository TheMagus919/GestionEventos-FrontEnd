import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true ,
})
export class AuthDirective {
  private isLoggedIn = false;
  private showForLoggedIn = false;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.updateView();
    });
  }

 
  @Input() set appAuth(showForLoggedIn: boolean) {
    this.showForLoggedIn = showForLoggedIn;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();

    if (this.showForLoggedIn === this.isLoggedIn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}