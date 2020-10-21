import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FilmModule } from './film/film.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      path: 'graphql'
    }),
    FilmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
