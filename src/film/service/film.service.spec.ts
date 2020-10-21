import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { Observable } from 'rxjs';

import { FilmMock } from '../../../test/mocks/film.mock';

import { FilmClient } from '../client/film.client';
import { FilmService } from './film.service';
import { FilmResponse } from '../client/response/filmResponse';

describe('FilmService', () => {
  let client: FilmClient;
  let service: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FilmClient, FilmService],
    }).compile();

    client = await module.resolve<FilmClient>(FilmClient);
    service = await module.resolve<FilmService>(FilmService);
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
    expect(service).toBeDefined();
  });

  test('Get films', done => {
    const response = new Observable<AxiosResponse<FilmResponse>>(subscriber =>
      subscriber.next({
        data: FilmMock,
        status: 200,
        statusText: 'Ok',
        headers: {},
        config: {},
      }),
    );

    jest.spyOn(client, 'films').mockImplementation(() => response);

    service.films().subscribe(result => {
      expect(result).toEqual(FilmMock.results);
      done();
    });
  });
});
