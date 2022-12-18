// https://www.totaltypescript.com/tips/decode-url-search-params-at-the-type-level-with-ts-toolbelt

//? Decode URL search params at the type level with ts-toolbelt

//* Decode some URL search params AT THE TYPE LEVEL using some utilities from `ts-toolbelt`.  These work similarly to methods in JavaScript.

import { String, Union } from 'ts-toolbelt';

//* Take the following query:
const query = '/home?a=hello&b=world';

//* And turn it into an object that's type-safe and has autocomplete:
// const queryObj: Union.Merge<QueryParams> = {
//   a: 'hello',
//   b: 'world',
// };

type Query = typeof query;
// type Query = "/home?a=hello&b=world"

type QueryString = String.Split<Query, '?'>[1];
// type QueryString = 'a=hello&b=world'

type QueryElements = String.Split<QueryString, '&'>;
// type QueryElements = ["a=hello", "b=world"]

type QueryParams = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, '='>[0]]: String.Split<
      QueryElement,
      '='
    >[1];
  };
}[QueryElements[number]];
// type QueryParams = {
//   a: "hello";
// } | {
//   b: "world";
// }

//* Now merge the union of objects (type QueryParams) into a single object type
type QueryAsObject = Union.Merge<QueryParams>;
// type QueryAsObject = {
//   a: "hello";
//   b: "world";
// }

//* We get type safety and autocomplete while creating "queryObj"
const queryObj: QueryAsObject = {
  a: 'hello',
  b: 'world',
};

//* If back in "query" we change "a" to "goodbye" then "queryObj" would show an error and require "hello" to change to "goodbye"
