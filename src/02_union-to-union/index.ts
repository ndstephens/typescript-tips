// https://www.totaltypescript.com/tips/use-in-operator-to-transform-a-union-to-another-union

//? Use 'in' operator to transform a union to another union

//* Transform a union to another union, using the 'in' operator as a kind of for-loop.  This pattern can be used for almost any kind of transformation.

//* Go from this:
export type Entity =
  | {
      type: 'user';
    }
  | {
      type: 'post';
    }
  | {
      type: 'comment';
    };

//* To auto-generate this:
// type EntityWithId =
//   | {
//       type: 'user';
//       userId: string;
//     }
//   | {
//       type: 'post';
//       postId: string;
//     }
//   | {
//       type: 'comment';
//       commentId: string;
//     };

type EntityWithId = {
  [EntityType in Entity['type']]: {
    type: EntityType;
  } & Record<`${EntityType}Id`, string>;
}[Entity['type']];

//* We get type safety and autocomplete while creating "result"
const result: EntityWithId = {
  type: 'post',
  postId: '123',
};
