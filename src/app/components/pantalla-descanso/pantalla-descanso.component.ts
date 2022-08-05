import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSecureCookieService } from 'ngx-secure-cookie';

@Component({
  selector: 'app-pantalla-descanso',
  templateUrl: './pantalla-descanso.component.html',
  styleUrls: ['./pantalla-descanso.css'],
})
export class PantallaDescansoComponent implements OnInit {
  contadorVideos = 0;
  codigoEmpresa: string;
  val;
  key;
  banderaCodigoEmpresa: boolean = false;
  @ViewChild('videoPantallaDescanso') videoPantallaDescanso: any;

  constructor(
    private router: Router,
    private cookie: NgxSecureCookieService,
  ) {
    localStorage.clear();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.miVideo = this.playlist[this.contadorVideos];
    if ((this.miVideo.reproducido <= this.miVideo.total) || this.miVideo.total === -1) {
      this.videoPantallaDescanso?.nativeElement.play();
    }
  }

  playlist:
    {
      link: string,
      total: number,
      reproducido: number,
    }[] = [
      {
        link: 'assets/videos/PT360.mp4',
        total: -1,
        reproducido: 0,
      },
      {
        link: 'assets/videos/PT360.mp4',
        total: 3,
        reproducido: 0,
      },
      {
        link: 'assets/videos/PT360.mp4',
        total: 2,
        reproducido: 1,
      },
      {
        link: 'assets/videos/PT360.mp4',
        total: 4,
        reproducido: 1,
      },
    ];

  miVideo: {
    link: string,
    total: number,
    reproducido: number,
  } = this.playlist.find(p => p.total === -1);

  inicio() {
    this.router.navigate(['kiosco', 'pantalla-bienvenida']);
  }

  finalizarVideo() {
    do {
      this.contadorVideos++;
      if (this.contadorVideos >= this.playlist.length) {
        this.contadorVideos = 0;
        this.miVideo = this.playlist[this.contadorVideos];
        break;
      }
      this.miVideo = this.playlist[this.contadorVideos];
    } while (this.miVideo.reproducido >= this.miVideo.total);

    this.videoPantallaDescanso.nativeElement.load();
    this.videoPantallaDescanso?.nativeElement.play();
  }

  enviarCodigoEmpresa() {
    this.key = this.cookie.generateKey();
    this.cookie.set("key", this.key, false, null, 1825);
    this.cookie.set("codigoEmpresa", this.codigoEmpresa, true, this.key, 1825);
    this.router.navigate(['kiosco', 'pantalla-bienvenida']);
  }
  verificarCodigoEmpresa() {
    if (this.cookie.check("codigoEmpresa") == false) {
    }
    else {
      this.router.navigate(['pantalla-bienvenida']);
    }
  }

}