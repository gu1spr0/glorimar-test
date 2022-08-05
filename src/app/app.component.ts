import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  ambiente: boolean = environment.production;
  title = 'Kiosko';
  currentUrl: string;
  event$
  idleState = 'No inicio';
  timedOut = false;
  lastPing?: Date = null;

  public modalRef: BsModalRef;

  @ViewChild('modalInactividad', { static: false }) modalInactividad: ModalDirective;

  constructor(private idle: Idle, private keepalive: Keepalive, private router: Router) {
    if (this.ambiente) {
      this.hasIdleScreen();
      idle.setIdle(10);
      idle.setTimeout(10);
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => {
        this.idleState = 'Estas activo !'
        this.reset();
      });

      idle.onTimeout.subscribe(() => {
        this.modalInactividad.hide();
        this.idleState = 'El tiempo se acabo!';
        this.timedOut = true;
        localStorage.clear();
        this.router.navigate(['kiosco', 'pantalla-descanso']);
      });

      idle.onIdleStart.subscribe(() => {
        this.idleState = 'Has sido Redireccionado !'
        this.modalInactividad.show()
      });

      idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = countdown
      });

      keepalive.interval(10);
      keepalive.onPing.subscribe(() => this.lastPing = new Date())

    }
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  hasIdleScreen() {
    this.event$ = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.currentUrl = event.url;
          if (this.currentUrl !== "/kiosco/pantalla-descanso") {
            this.idle.watch()
            this.timedOut = false;
          } else {
            this.idle.stop();
          }
        }
      });
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.modalInactividad.hide();
  }

  stay() {
    this.modalInactividad.hide();
    this.reset();
  }

  irPantallaDescanso() {
    this.router.navigate(['kiosco', 'pantalla-descanso']);
    this.modalInactividad.hide();
  }
}
