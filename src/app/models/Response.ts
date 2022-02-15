import { Person } from "./Person";

export interface Response {
  results: [
    {data: Person[]}
  ],
  info: any
}
