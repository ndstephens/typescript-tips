// Sometimes you may want to type an object which has several different optional keys, but all with the same type.

export const fruitCount = {
  apple: 1,
  pear: 4,
  banana: 26,
};

// Want something like this:
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

type SingleFruitCount = {
  [K in keyof FruitCount]: {
    [Key in K]: number;
  };
}[keyof FruitCount];

//* Now hover over "SingleFruitCount" to see the type

const singleFruitCount: SingleFruitCount = {
  banana: 12,
};
