import { Resolver, Query } from '@nestjs/graphql';
import { Film } from '../models/film.model';
import { FilmService } from '../service/film.service';

@Resolver(Film)
export class FilmResolver {
  constructor(private filmService: FilmService) {}

  @Query(() => [Film])
  films() {
    return this.filmService.films();
  }
}
