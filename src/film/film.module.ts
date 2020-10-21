import { HttpModule, Module } from '@nestjs/common';
import { FilmClient } from './client/film.client';
import { FilmService } from './service/film.service';
import { FilmResolver } from './resolver/film.resolver';

@Module({
  imports: [HttpModule],
  providers: [FilmClient, FilmService, FilmResolver]
})
export class FilmModule {}
