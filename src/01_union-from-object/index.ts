// https://www.totaltypescript.com/tips/derive-a-union-type-from-an-object

//? Derive a union type from an object

//* Sometimes you may want to use an object to auto-generate a union type which has several different (but specific) optional keys, all with the same type.

export const fruitCount = {
  apple: 1,
  pear: 4,
  banana: 26,
};

//* Want to auto-generate something like this:
// type SingleFruitCount =
//   | {
//       apple: number
//     }
//   | {
//       banana: number
//     }
//   | {
//       pear: number
//     }

type FruitCount = typeof fruitCount;

//* Hover over "SingleFruitCount" to see the type
type SingleFruitCount = {
  [K in keyof FruitCount]: {
    [Key in K]: number;
  };
}[keyof FruitCount];

//* We get type safety and autocomplete while creating "singleFruitCount"
const singleFruitCount: SingleFruitCount = {
  banana: 12,
};
