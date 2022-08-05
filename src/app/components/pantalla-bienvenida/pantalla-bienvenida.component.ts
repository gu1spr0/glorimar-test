import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-bienvenida',
  templateUrl: './pantalla-bienvenida.component.html',
  styleUrls: ['./pantalla-bienvenida.css'],
})
export class PantallaBienvenidaComponent implements OnInit, AfterViewInit {
  contadorVideos = 0;

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

  @ViewChild('videoPantallaBienvenida') videoPantallaBienvenida: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.miVideo = this.playlist[this.contadorVideos];
    if ((this.miVideo.reproducido <= this.miVideo.total) || this.miVideo.total === -1) {
      this.videoPantallaBienvenida?.nativeElement.play();
    }
  }

  video() {
    this.videoPantallaBienvenida?.Play();
  }

  inicio() {
    this.router.navigate(['kiosco', 'empresas']);
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

    this.videoPantallaBienvenida.nativeElement.load();
    this.videoPantallaBienvenida?.nativeElement.play();
  }

}