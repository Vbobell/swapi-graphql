import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { axiosMock } from '../../../test/utils/axios-mock';
import { FilmMock } from '../../../test/mocks/film.mock';

import { FilmClient } from './film.client';
import { FilmResponse } from './response/filmResponse';

describe('FilmClient', () => {
  let client: FilmClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FilmClient],
    }).compile();

    client = module.get<FilmClient>(FilmClient);
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  test('Get films', done => {
    axiosMock
      .onGet('https://swapi.dev/api/films')
      .replyOnce<FilmResponse>(200, FilmMock);

    client.films().subscribe(result => {
      expect(result.data).toEqual(FilmMock);
      done();
    });
  });
});
