import { HttpService, Injectable } from '@nestjs/common';
import { FilmResponse } from './response/filmResponse';

@Injectable()
export class FilmClient {
  constructor(private readonly httpService: HttpService) {}

  films() {
    return this.httpService.get<FilmResponse>(`${this.getBaseURL()}/films`);
  }

  private getBaseURL() {
    return 'https://swapi.dev/api';
  }
}
