import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Film {
  @Field()
  episode_id: number;

  @Field({ description: 'Name' })
  title: string;

  @Field({ description: 'Description' })
  opening_crawl: string;

  @Field({ description: 'Director' })
  director: string;

  @Field({ description: 'Producer' })
  producer: string;

  @Field({ description: 'Release' })
  release_date: string;

  @Field(() => [String], { description: 'List characters' })
  characters: string;

  @Field(() => [String], { description: 'List planets' })
  planets: string[];

  @Field(() => [String], { description: 'List starships' })
  starships: string[];

  @Field(() => [String], { description: 'List vehicles' })
  vehicles: string[];

  @Field(() => [String], { description: 'List species' })
  species: string[];

  @Field({ description: 'Date of created' })
  created: Date;

  @Field({ description: 'Date of edited' })
  edited: Date;

  @Field({ description: 'Url' })
  url: string;
}
