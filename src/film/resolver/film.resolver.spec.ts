import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { Observable } from 'rxjs';

import { FilmMock } from '../../../test/mocks/film.mock';

import { FilmClient } from '../client/film.client';
import { FilmService } from '../service/film.service';
import { FilmResolver } from './film.resolver';
import { Film } from '../client/response/filmResponse';
import { resolve } from 'path';

describe('FilmService', () => {
  let service: FilmService;
  let resolver: FilmResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FilmClient, FilmService, FilmResolver],
    }).compile();

    service = await module.resolve<FilmService>(FilmService);
    resolver = await module.resolve<FilmResolver>(FilmResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(resolver).toBeDefined();
  });

  test('Get films', done => {
    const response = new Observable<Film[]>(subscriber =>
      subscriber.next(FilmMock.results),
    );

    jest.spyOn(service, 'films').mockImplementation(() => response);

    resolver.films().subscribe(result => {
      expect(result).toEqual(FilmMock.results);
      done();
    });
  });
});
