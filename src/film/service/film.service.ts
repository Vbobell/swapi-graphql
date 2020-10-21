import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { FilmClient } from '../client/film.client';

@Injectable()
export class FilmService {
  constructor(private readonly filmClient: FilmClient) {}

  films() {
    return this.filmClient.films().pipe(map(response => response.data.results));
  }
}
