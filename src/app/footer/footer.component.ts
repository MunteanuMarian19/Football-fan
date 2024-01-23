import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showImportantNote = false;

  footer: String =
    'The retrieval of data on mobile devices is subject to limitations due to constraints in database access. For the optimal experience, we suggest accessing this web app from a desktop browser.';

  toggleImportantNote() {
    this.showImportantNote = !this.showImportantNote;
  }

  closeImportantNote() {
    this.showImportantNote = false;
  }
}
