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

    if(!media.cover){
      if (media.type === 'spotify'){
        artwork = this.spotifyService.getAlbumArtwork(media.artist, media.title);
      }else if(media.type === 'tunein'){

      
        let tuneincover = "https://cdn-profiles.tunein.com/s"+media.id+"/images/logod.png";
        artwork = new Observable((observer) => {
            observer.next(media.cover);
            
         });
         
        }
      }else{
      artwork = new Observable((observer) => {
        observer.next(media.cover);
         
      });
      }
    

    return artwork;
  }
}
