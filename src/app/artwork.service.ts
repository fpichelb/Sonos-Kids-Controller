import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from './media';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(
      private spotifyService: SpotifyService
  ) { }

  getArtwork(media: Media): Observable<string> {
    let artwork: Observable<string>;

    if (media.type === 'spotify' && !media.cover) {
      artwork = this.spotifyService.getAlbumArtwork(media.artist, media.title);
    } else if(media.type==="tunein" && !media.cover){

      const tuneincover = "https://cdn-profiles.tunein.com/"+media.id+"/images/logod.png";
      artwork = new Observable((observer) => {
          observer.next(tuneincover);
        });
    }else{
      artwork = new Observable((observer) => {
          observer.next(media.cover);
        });
      }
    

    return artwork;
  }
}
