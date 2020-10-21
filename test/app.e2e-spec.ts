import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { FilmMock } from './mocks/film.mock';
import { FilmResponse } from '../src/film/client/response/filmResponse';
import { axiosMock } from './utils/axios-mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ Get film id and description', () => {
    axiosMock
      .onGet('https://swapi.dev/api/films')
      .replyOnce<FilmResponse>(200, FilmMock);

    return request(app.getHttpServer())
      .post('/graphql')
      .type('form')
      .send({
        query: `
        query {
          films {
            episode_id
            opening_crawl 
          }
        }`,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toEqual({
          films: [
            {
              episode_id: 4,
              opening_crawl:
                "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            },
          ],
        });
      });
  });
});
