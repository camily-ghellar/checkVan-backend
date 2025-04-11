
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model children
 * 
 */
export type children = $Result.DefaultSelection<Prisma.$childrenPayload>
/**
 * Model drivers
 * 
 */
export type drivers = $Result.DefaultSelection<Prisma.$driversPayload>
/**
 * Model guardians
 * 
 */
export type guardians = $Result.DefaultSelection<Prisma.$guardiansPayload>
/**
 * Model trips
 * 
 */
export type trips = $Result.DefaultSelection<Prisma.$tripsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Children
 * const children = await prisma.children.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Children
   * const children = await prisma.children.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.children`: Exposes CRUD operations for the **children** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Children
    * const children = await prisma.children.findMany()
    * ```
    */
  get children(): Prisma.childrenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.drivers`: Exposes CRUD operations for the **drivers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.drivers.findMany()
    * ```
    */
  get drivers(): Prisma.driversDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guardians`: Exposes CRUD operations for the **guardians** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guardians
    * const guardians = await prisma.guardians.findMany()
    * ```
    */
  get guardians(): Prisma.guardiansDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trips`: Exposes CRUD operations for the **trips** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trips
    * const trips = await prisma.trips.findMany()
    * ```
    */
  get trips(): Prisma.tripsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    children: 'children',
    drivers: 'drivers',
    guardians: 'guardians',
    trips: 'trips'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "children" | "drivers" | "guardians" | "trips"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      children: {
        payload: Prisma.$childrenPayload<ExtArgs>
        fields: Prisma.childrenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.childrenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.childrenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>
          }
          findFirst: {
            args: Prisma.childrenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.childrenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>
          }
          findMany: {
            args: Prisma.childrenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>[]
          }
          create: {
            args: Prisma.childrenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>
          }
          createMany: {
            args: Prisma.childrenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.childrenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>[]
          }
          delete: {
            args: Prisma.childrenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>
          }
          update: {
            args: Prisma.childrenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>
          }
          deleteMany: {
            args: Prisma.childrenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.childrenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.childrenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>[]
          }
          upsert: {
            args: Prisma.childrenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$childrenPayload>
          }
          aggregate: {
            args: Prisma.ChildrenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChildren>
          }
          groupBy: {
            args: Prisma.childrenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChildrenGroupByOutputType>[]
          }
          count: {
            args: Prisma.childrenCountArgs<ExtArgs>
            result: $Utils.Optional<ChildrenCountAggregateOutputType> | number
          }
        }
      }
      drivers: {
        payload: Prisma.$driversPayload<ExtArgs>
        fields: Prisma.driversFieldRefs
        operations: {
          findUnique: {
            args: Prisma.driversFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.driversFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          findFirst: {
            args: Prisma.driversFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.driversFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          findMany: {
            args: Prisma.driversFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          create: {
            args: Prisma.driversCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          createMany: {
            args: Prisma.driversCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.driversCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          delete: {
            args: Prisma.driversDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          update: {
            args: Prisma.driversUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          deleteMany: {
            args: Prisma.driversDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.driversUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.driversUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          upsert: {
            args: Prisma.driversUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          aggregate: {
            args: Prisma.DriversAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDrivers>
          }
          groupBy: {
            args: Prisma.driversGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriversGroupByOutputType>[]
          }
          count: {
            args: Prisma.driversCountArgs<ExtArgs>
            result: $Utils.Optional<DriversCountAggregateOutputType> | number
          }
        }
      }
      guardians: {
        payload: Prisma.$guardiansPayload<ExtArgs>
        fields: Prisma.guardiansFieldRefs
        operations: {
          findUnique: {
            args: Prisma.guardiansFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.guardiansFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>
          }
          findFirst: {
            args: Prisma.guardiansFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.guardiansFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>
          }
          findMany: {
            args: Prisma.guardiansFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>[]
          }
          create: {
            args: Prisma.guardiansCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>
          }
          createMany: {
            args: Prisma.guardiansCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.guardiansCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>[]
          }
          delete: {
            args: Prisma.guardiansDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>
          }
          update: {
            args: Prisma.guardiansUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>
          }
          deleteMany: {
            args: Prisma.guardiansDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.guardiansUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.guardiansUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>[]
          }
          upsert: {
            args: Prisma.guardiansUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guardiansPayload>
          }
          aggregate: {
            args: Prisma.GuardiansAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuardians>
          }
          groupBy: {
            args: Prisma.guardiansGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuardiansGroupByOutputType>[]
          }
          count: {
            args: Prisma.guardiansCountArgs<ExtArgs>
            result: $Utils.Optional<GuardiansCountAggregateOutputType> | number
          }
        }
      }
      trips: {
        payload: Prisma.$tripsPayload<ExtArgs>
        fields: Prisma.tripsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tripsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tripsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>
          }
          findFirst: {
            args: Prisma.tripsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tripsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>
          }
          findMany: {
            args: Prisma.tripsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>[]
          }
          create: {
            args: Prisma.tripsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>
          }
          createMany: {
            args: Prisma.tripsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tripsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>[]
          }
          delete: {
            args: Prisma.tripsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>
          }
          update: {
            args: Prisma.tripsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>
          }
          deleteMany: {
            args: Prisma.tripsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tripsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tripsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>[]
          }
          upsert: {
            args: Prisma.tripsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tripsPayload>
          }
          aggregate: {
            args: Prisma.TripsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrips>
          }
          groupBy: {
            args: Prisma.tripsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TripsGroupByOutputType>[]
          }
          count: {
            args: Prisma.tripsCountArgs<ExtArgs>
            result: $Utils.Optional<TripsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    children?: childrenOmit
    drivers?: driversOmit
    guardians?: guardiansOmit
    trips?: tripsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DriversCountOutputType
   */

  export type DriversCountOutputType = {
    children: number
    trips: number
  }

  export type DriversCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | DriversCountOutputTypeCountChildrenArgs
    trips?: boolean | DriversCountOutputTypeCountTripsArgs
  }

  // Custom InputTypes
  /**
   * DriversCountOutputType without action
   */
  export type DriversCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriversCountOutputType
     */
    select?: DriversCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DriversCountOutputType without action
   */
  export type DriversCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: childrenWhereInput
  }

  /**
   * DriversCountOutputType without action
   */
  export type DriversCountOutputTypeCountTripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tripsWhereInput
  }


  /**
   * Count Type GuardiansCountOutputType
   */

  export type GuardiansCountOutputType = {
    children: number
  }

  export type GuardiansCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | GuardiansCountOutputTypeCountChildrenArgs
  }

  // Custom InputTypes
  /**
   * GuardiansCountOutputType without action
   */
  export type GuardiansCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuardiansCountOutputType
     */
    select?: GuardiansCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuardiansCountOutputType without action
   */
  export type GuardiansCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: childrenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model children
   */

  export type AggregateChildren = {
    _count: ChildrenCountAggregateOutputType | null
    _avg: ChildrenAvgAggregateOutputType | null
    _sum: ChildrenSumAggregateOutputType | null
    _min: ChildrenMinAggregateOutputType | null
    _max: ChildrenMaxAggregateOutputType | null
  }

  export type ChildrenAvgAggregateOutputType = {
    id: number | null
    guardian_id: number | null
    driver_id: number | null
  }

  export type ChildrenSumAggregateOutputType = {
    id: number | null
    guardian_id: number | null
    driver_id: number | null
  }

  export type ChildrenMinAggregateOutputType = {
    id: number | null
    child_name: string | null
    starting_point: string | null
    destination: string | null
    guardian_id: number | null
    driver_id: number | null
    birth_date: Date | null
    school: string | null
  }

  export type ChildrenMaxAggregateOutputType = {
    id: number | null
    child_name: string | null
    starting_point: string | null
    destination: string | null
    guardian_id: number | null
    driver_id: number | null
    birth_date: Date | null
    school: string | null
  }

  export type ChildrenCountAggregateOutputType = {
    id: number
    child_name: number
    starting_point: number
    destination: number
    guardian_id: number
    driver_id: number
    birth_date: number
    school: number
    _all: number
  }


  export type ChildrenAvgAggregateInputType = {
    id?: true
    guardian_id?: true
    driver_id?: true
  }

  export type ChildrenSumAggregateInputType = {
    id?: true
    guardian_id?: true
    driver_id?: true
  }

  export type ChildrenMinAggregateInputType = {
    id?: true
    child_name?: true
    starting_point?: true
    destination?: true
    guardian_id?: true
    driver_id?: true
    birth_date?: true
    school?: true
  }

  export type ChildrenMaxAggregateInputType = {
    id?: true
    child_name?: true
    starting_point?: true
    destination?: true
    guardian_id?: true
    driver_id?: true
    birth_date?: true
    school?: true
  }

  export type ChildrenCountAggregateInputType = {
    id?: true
    child_name?: true
    starting_point?: true
    destination?: true
    guardian_id?: true
    driver_id?: true
    birth_date?: true
    school?: true
    _all?: true
  }

  export type ChildrenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which children to aggregate.
     */
    where?: childrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of children to fetch.
     */
    orderBy?: childrenOrderByWithRelationInput | childrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: childrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned children
    **/
    _count?: true | ChildrenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChildrenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChildrenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChildrenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChildrenMaxAggregateInputType
  }

  export type GetChildrenAggregateType<T extends ChildrenAggregateArgs> = {
        [P in keyof T & keyof AggregateChildren]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChildren[P]>
      : GetScalarType<T[P], AggregateChildren[P]>
  }




  export type childrenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: childrenWhereInput
    orderBy?: childrenOrderByWithAggregationInput | childrenOrderByWithAggregationInput[]
    by: ChildrenScalarFieldEnum[] | ChildrenScalarFieldEnum
    having?: childrenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChildrenCountAggregateInputType | true
    _avg?: ChildrenAvgAggregateInputType
    _sum?: ChildrenSumAggregateInputType
    _min?: ChildrenMinAggregateInputType
    _max?: ChildrenMaxAggregateInputType
  }

  export type ChildrenGroupByOutputType = {
    id: number
    child_name: string
    starting_point: string
    destination: string
    guardian_id: number | null
    driver_id: number | null
    birth_date: Date | null
    school: string | null
    _count: ChildrenCountAggregateOutputType | null
    _avg: ChildrenAvgAggregateOutputType | null
    _sum: ChildrenSumAggregateOutputType | null
    _min: ChildrenMinAggregateOutputType | null
    _max: ChildrenMaxAggregateOutputType | null
  }

  type GetChildrenGroupByPayload<T extends childrenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChildrenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChildrenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChildrenGroupByOutputType[P]>
            : GetScalarType<T[P], ChildrenGroupByOutputType[P]>
        }
      >
    >


  export type childrenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    child_name?: boolean
    starting_point?: boolean
    destination?: boolean
    guardian_id?: boolean
    driver_id?: boolean
    birth_date?: boolean
    school?: boolean
    drivers?: boolean | children$driversArgs<ExtArgs>
    guardians?: boolean | children$guardiansArgs<ExtArgs>
  }, ExtArgs["result"]["children"]>

  export type childrenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    child_name?: boolean
    starting_point?: boolean
    destination?: boolean
    guardian_id?: boolean
    driver_id?: boolean
    birth_date?: boolean
    school?: boolean
    drivers?: boolean | children$driversArgs<ExtArgs>
    guardians?: boolean | children$guardiansArgs<ExtArgs>
  }, ExtArgs["result"]["children"]>

  export type childrenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    child_name?: boolean
    starting_point?: boolean
    destination?: boolean
    guardian_id?: boolean
    driver_id?: boolean
    birth_date?: boolean
    school?: boolean
    drivers?: boolean | children$driversArgs<ExtArgs>
    guardians?: boolean | children$guardiansArgs<ExtArgs>
  }, ExtArgs["result"]["children"]>

  export type childrenSelectScalar = {
    id?: boolean
    child_name?: boolean
    starting_point?: boolean
    destination?: boolean
    guardian_id?: boolean
    driver_id?: boolean
    birth_date?: boolean
    school?: boolean
  }

  export type childrenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "child_name" | "starting_point" | "destination" | "guardian_id" | "driver_id" | "birth_date" | "school", ExtArgs["result"]["children"]>
  export type childrenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | children$driversArgs<ExtArgs>
    guardians?: boolean | children$guardiansArgs<ExtArgs>
  }
  export type childrenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | children$driversArgs<ExtArgs>
    guardians?: boolean | children$guardiansArgs<ExtArgs>
  }
  export type childrenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | children$driversArgs<ExtArgs>
    guardians?: boolean | children$guardiansArgs<ExtArgs>
  }

  export type $childrenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "children"
    objects: {
      drivers: Prisma.$driversPayload<ExtArgs> | null
      guardians: Prisma.$guardiansPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      child_name: string
      starting_point: string
      destination: string
      guardian_id: number | null
      driver_id: number | null
      birth_date: Date | null
      school: string | null
    }, ExtArgs["result"]["children"]>
    composites: {}
  }

  type childrenGetPayload<S extends boolean | null | undefined | childrenDefaultArgs> = $Result.GetResult<Prisma.$childrenPayload, S>

  type childrenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<childrenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChildrenCountAggregateInputType | true
    }

  export interface childrenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['children'], meta: { name: 'children' } }
    /**
     * Find zero or one Children that matches the filter.
     * @param {childrenFindUniqueArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends childrenFindUniqueArgs>(args: SelectSubset<T, childrenFindUniqueArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Children that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {childrenFindUniqueOrThrowArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends childrenFindUniqueOrThrowArgs>(args: SelectSubset<T, childrenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {childrenFindFirstArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends childrenFindFirstArgs>(args?: SelectSubset<T, childrenFindFirstArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Children that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {childrenFindFirstOrThrowArgs} args - Arguments to find a Children
     * @example
     * // Get one Children
     * const children = await prisma.children.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends childrenFindFirstOrThrowArgs>(args?: SelectSubset<T, childrenFindFirstOrThrowArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {childrenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Children
     * const children = await prisma.children.findMany()
     * 
     * // Get first 10 Children
     * const children = await prisma.children.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const childrenWithIdOnly = await prisma.children.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends childrenFindManyArgs>(args?: SelectSubset<T, childrenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Children.
     * @param {childrenCreateArgs} args - Arguments to create a Children.
     * @example
     * // Create one Children
     * const Children = await prisma.children.create({
     *   data: {
     *     // ... data to create a Children
     *   }
     * })
     * 
     */
    create<T extends childrenCreateArgs>(args: SelectSubset<T, childrenCreateArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Children.
     * @param {childrenCreateManyArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const children = await prisma.children.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends childrenCreateManyArgs>(args?: SelectSubset<T, childrenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Children and returns the data saved in the database.
     * @param {childrenCreateManyAndReturnArgs} args - Arguments to create many Children.
     * @example
     * // Create many Children
     * const children = await prisma.children.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Children and only return the `id`
     * const childrenWithIdOnly = await prisma.children.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends childrenCreateManyAndReturnArgs>(args?: SelectSubset<T, childrenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Children.
     * @param {childrenDeleteArgs} args - Arguments to delete one Children.
     * @example
     * // Delete one Children
     * const Children = await prisma.children.delete({
     *   where: {
     *     // ... filter to delete one Children
     *   }
     * })
     * 
     */
    delete<T extends childrenDeleteArgs>(args: SelectSubset<T, childrenDeleteArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Children.
     * @param {childrenUpdateArgs} args - Arguments to update one Children.
     * @example
     * // Update one Children
     * const children = await prisma.children.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends childrenUpdateArgs>(args: SelectSubset<T, childrenUpdateArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Children.
     * @param {childrenDeleteManyArgs} args - Arguments to filter Children to delete.
     * @example
     * // Delete a few Children
     * const { count } = await prisma.children.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends childrenDeleteManyArgs>(args?: SelectSubset<T, childrenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {childrenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Children
     * const children = await prisma.children.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends childrenUpdateManyArgs>(args: SelectSubset<T, childrenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children and returns the data updated in the database.
     * @param {childrenUpdateManyAndReturnArgs} args - Arguments to update many Children.
     * @example
     * // Update many Children
     * const children = await prisma.children.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Children and only return the `id`
     * const childrenWithIdOnly = await prisma.children.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends childrenUpdateManyAndReturnArgs>(args: SelectSubset<T, childrenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Children.
     * @param {childrenUpsertArgs} args - Arguments to update or create a Children.
     * @example
     * // Update or create a Children
     * const children = await prisma.children.upsert({
     *   create: {
     *     // ... data to create a Children
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Children we want to update
     *   }
     * })
     */
    upsert<T extends childrenUpsertArgs>(args: SelectSubset<T, childrenUpsertArgs<ExtArgs>>): Prisma__childrenClient<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {childrenCountArgs} args - Arguments to filter Children to count.
     * @example
     * // Count the number of Children
     * const count = await prisma.children.count({
     *   where: {
     *     // ... the filter for the Children we want to count
     *   }
     * })
    **/
    count<T extends childrenCountArgs>(
      args?: Subset<T, childrenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChildrenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildrenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChildrenAggregateArgs>(args: Subset<T, ChildrenAggregateArgs>): Prisma.PrismaPromise<GetChildrenAggregateType<T>>

    /**
     * Group by Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {childrenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends childrenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: childrenGroupByArgs['orderBy'] }
        : { orderBy?: childrenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, childrenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChildrenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the children model
   */
  readonly fields: childrenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for children.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__childrenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    drivers<T extends children$driversArgs<ExtArgs> = {}>(args?: Subset<T, children$driversArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    guardians<T extends children$guardiansArgs<ExtArgs> = {}>(args?: Subset<T, children$guardiansArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the children model
   */
  interface childrenFieldRefs {
    readonly id: FieldRef<"children", 'Int'>
    readonly child_name: FieldRef<"children", 'String'>
    readonly starting_point: FieldRef<"children", 'String'>
    readonly destination: FieldRef<"children", 'String'>
    readonly guardian_id: FieldRef<"children", 'Int'>
    readonly driver_id: FieldRef<"children", 'Int'>
    readonly birth_date: FieldRef<"children", 'DateTime'>
    readonly school: FieldRef<"children", 'String'>
  }
    

  // Custom InputTypes
  /**
   * children findUnique
   */
  export type childrenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * Filter, which children to fetch.
     */
    where: childrenWhereUniqueInput
  }

  /**
   * children findUniqueOrThrow
   */
  export type childrenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * Filter, which children to fetch.
     */
    where: childrenWhereUniqueInput
  }

  /**
   * children findFirst
   */
  export type childrenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * Filter, which children to fetch.
     */
    where?: childrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of children to fetch.
     */
    orderBy?: childrenOrderByWithRelationInput | childrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for children.
     */
    cursor?: childrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of children.
     */
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * children findFirstOrThrow
   */
  export type childrenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * Filter, which children to fetch.
     */
    where?: childrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of children to fetch.
     */
    orderBy?: childrenOrderByWithRelationInput | childrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for children.
     */
    cursor?: childrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of children.
     */
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * children findMany
   */
  export type childrenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * Filter, which children to fetch.
     */
    where?: childrenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of children to fetch.
     */
    orderBy?: childrenOrderByWithRelationInput | childrenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing children.
     */
    cursor?: childrenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` children.
     */
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * children create
   */
  export type childrenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * The data needed to create a children.
     */
    data: XOR<childrenCreateInput, childrenUncheckedCreateInput>
  }

  /**
   * children createMany
   */
  export type childrenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many children.
     */
    data: childrenCreateManyInput | childrenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * children createManyAndReturn
   */
  export type childrenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * The data used to create many children.
     */
    data: childrenCreateManyInput | childrenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * children update
   */
  export type childrenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * The data needed to update a children.
     */
    data: XOR<childrenUpdateInput, childrenUncheckedUpdateInput>
    /**
     * Choose, which children to update.
     */
    where: childrenWhereUniqueInput
  }

  /**
   * children updateMany
   */
  export type childrenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update children.
     */
    data: XOR<childrenUpdateManyMutationInput, childrenUncheckedUpdateManyInput>
    /**
     * Filter which children to update
     */
    where?: childrenWhereInput
    /**
     * Limit how many children to update.
     */
    limit?: number
  }

  /**
   * children updateManyAndReturn
   */
  export type childrenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * The data used to update children.
     */
    data: XOR<childrenUpdateManyMutationInput, childrenUncheckedUpdateManyInput>
    /**
     * Filter which children to update
     */
    where?: childrenWhereInput
    /**
     * Limit how many children to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * children upsert
   */
  export type childrenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * The filter to search for the children to update in case it exists.
     */
    where: childrenWhereUniqueInput
    /**
     * In case the children found by the `where` argument doesn't exist, create a new children with this data.
     */
    create: XOR<childrenCreateInput, childrenUncheckedCreateInput>
    /**
     * In case the children was found with the provided `where` argument, update it with this data.
     */
    update: XOR<childrenUpdateInput, childrenUncheckedUpdateInput>
  }

  /**
   * children delete
   */
  export type childrenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    /**
     * Filter which children to delete.
     */
    where: childrenWhereUniqueInput
  }

  /**
   * children deleteMany
   */
  export type childrenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which children to delete
     */
    where?: childrenWhereInput
    /**
     * Limit how many children to delete.
     */
    limit?: number
  }

  /**
   * children.drivers
   */
  export type children$driversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    where?: driversWhereInput
  }

  /**
   * children.guardians
   */
  export type children$guardiansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    where?: guardiansWhereInput
  }

  /**
   * children without action
   */
  export type childrenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
  }


  /**
   * Model drivers
   */

  export type AggregateDrivers = {
    _count: DriversCountAggregateOutputType | null
    _avg: DriversAvgAggregateOutputType | null
    _sum: DriversSumAggregateOutputType | null
    _min: DriversMinAggregateOutputType | null
    _max: DriversMaxAggregateOutputType | null
  }

  export type DriversAvgAggregateOutputType = {
    id: number | null
  }

  export type DriversSumAggregateOutputType = {
    id: number | null
  }

  export type DriversMinAggregateOutputType = {
    id: number | null
    driver_name: string | null
    phone: string | null
    email: string | null
    password: string | null
    driver_license: string | null
  }

  export type DriversMaxAggregateOutputType = {
    id: number | null
    driver_name: string | null
    phone: string | null
    email: string | null
    password: string | null
    driver_license: string | null
  }

  export type DriversCountAggregateOutputType = {
    id: number
    driver_name: number
    phone: number
    email: number
    password: number
    driver_license: number
    _all: number
  }


  export type DriversAvgAggregateInputType = {
    id?: true
  }

  export type DriversSumAggregateInputType = {
    id?: true
  }

  export type DriversMinAggregateInputType = {
    id?: true
    driver_name?: true
    phone?: true
    email?: true
    password?: true
    driver_license?: true
  }

  export type DriversMaxAggregateInputType = {
    id?: true
    driver_name?: true
    phone?: true
    email?: true
    password?: true
    driver_license?: true
  }

  export type DriversCountAggregateInputType = {
    id?: true
    driver_name?: true
    phone?: true
    email?: true
    password?: true
    driver_license?: true
    _all?: true
  }

  export type DriversAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drivers to aggregate.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned drivers
    **/
    _count?: true | DriversCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriversAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriversSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriversMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriversMaxAggregateInputType
  }

  export type GetDriversAggregateType<T extends DriversAggregateArgs> = {
        [P in keyof T & keyof AggregateDrivers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrivers[P]>
      : GetScalarType<T[P], AggregateDrivers[P]>
  }




  export type driversGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: driversWhereInput
    orderBy?: driversOrderByWithAggregationInput | driversOrderByWithAggregationInput[]
    by: DriversScalarFieldEnum[] | DriversScalarFieldEnum
    having?: driversScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriversCountAggregateInputType | true
    _avg?: DriversAvgAggregateInputType
    _sum?: DriversSumAggregateInputType
    _min?: DriversMinAggregateInputType
    _max?: DriversMaxAggregateInputType
  }

  export type DriversGroupByOutputType = {
    id: number
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
    _count: DriversCountAggregateOutputType | null
    _avg: DriversAvgAggregateOutputType | null
    _sum: DriversSumAggregateOutputType | null
    _min: DriversMinAggregateOutputType | null
    _max: DriversMaxAggregateOutputType | null
  }

  type GetDriversGroupByPayload<T extends driversGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriversGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriversGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriversGroupByOutputType[P]>
            : GetScalarType<T[P], DriversGroupByOutputType[P]>
        }
      >
    >


  export type driversSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driver_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    driver_license?: boolean
    children?: boolean | drivers$childrenArgs<ExtArgs>
    trips?: boolean | drivers$tripsArgs<ExtArgs>
    _count?: boolean | DriversCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driver_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    driver_license?: boolean
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driver_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    driver_license?: boolean
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectScalar = {
    id?: boolean
    driver_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    driver_license?: boolean
  }

  export type driversOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driver_name" | "phone" | "email" | "password" | "driver_license", ExtArgs["result"]["drivers"]>
  export type driversInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | drivers$childrenArgs<ExtArgs>
    trips?: boolean | drivers$tripsArgs<ExtArgs>
    _count?: boolean | DriversCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type driversIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type driversIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $driversPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "drivers"
    objects: {
      children: Prisma.$childrenPayload<ExtArgs>[]
      trips: Prisma.$tripsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      driver_name: string
      phone: string
      email: string
      password: string
      driver_license: string
    }, ExtArgs["result"]["drivers"]>
    composites: {}
  }

  type driversGetPayload<S extends boolean | null | undefined | driversDefaultArgs> = $Result.GetResult<Prisma.$driversPayload, S>

  type driversCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<driversFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DriversCountAggregateInputType | true
    }

  export interface driversDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['drivers'], meta: { name: 'drivers' } }
    /**
     * Find zero or one Drivers that matches the filter.
     * @param {driversFindUniqueArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends driversFindUniqueArgs>(args: SelectSubset<T, driversFindUniqueArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Drivers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {driversFindUniqueOrThrowArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends driversFindUniqueOrThrowArgs>(args: SelectSubset<T, driversFindUniqueOrThrowArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindFirstArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends driversFindFirstArgs>(args?: SelectSubset<T, driversFindFirstArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drivers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindFirstOrThrowArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends driversFindFirstOrThrowArgs>(args?: SelectSubset<T, driversFindFirstOrThrowArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.drivers.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.drivers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driversWithIdOnly = await prisma.drivers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends driversFindManyArgs>(args?: SelectSubset<T, driversFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Drivers.
     * @param {driversCreateArgs} args - Arguments to create a Drivers.
     * @example
     * // Create one Drivers
     * const Drivers = await prisma.drivers.create({
     *   data: {
     *     // ... data to create a Drivers
     *   }
     * })
     * 
     */
    create<T extends driversCreateArgs>(args: SelectSubset<T, driversCreateArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drivers.
     * @param {driversCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const drivers = await prisma.drivers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends driversCreateManyArgs>(args?: SelectSubset<T, driversCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {driversCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const drivers = await prisma.drivers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driversWithIdOnly = await prisma.drivers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends driversCreateManyAndReturnArgs>(args?: SelectSubset<T, driversCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Drivers.
     * @param {driversDeleteArgs} args - Arguments to delete one Drivers.
     * @example
     * // Delete one Drivers
     * const Drivers = await prisma.drivers.delete({
     *   where: {
     *     // ... filter to delete one Drivers
     *   }
     * })
     * 
     */
    delete<T extends driversDeleteArgs>(args: SelectSubset<T, driversDeleteArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Drivers.
     * @param {driversUpdateArgs} args - Arguments to update one Drivers.
     * @example
     * // Update one Drivers
     * const drivers = await prisma.drivers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends driversUpdateArgs>(args: SelectSubset<T, driversUpdateArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drivers.
     * @param {driversDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.drivers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends driversDeleteManyArgs>(args?: SelectSubset<T, driversDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const drivers = await prisma.drivers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends driversUpdateManyArgs>(args: SelectSubset<T, driversUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers and returns the data updated in the database.
     * @param {driversUpdateManyAndReturnArgs} args - Arguments to update many Drivers.
     * @example
     * // Update many Drivers
     * const drivers = await prisma.drivers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drivers and only return the `id`
     * const driversWithIdOnly = await prisma.drivers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends driversUpdateManyAndReturnArgs>(args: SelectSubset<T, driversUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Drivers.
     * @param {driversUpsertArgs} args - Arguments to update or create a Drivers.
     * @example
     * // Update or create a Drivers
     * const drivers = await prisma.drivers.upsert({
     *   create: {
     *     // ... data to create a Drivers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drivers we want to update
     *   }
     * })
     */
    upsert<T extends driversUpsertArgs>(args: SelectSubset<T, driversUpsertArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.drivers.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends driversCountArgs>(
      args?: Subset<T, driversCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriversCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriversAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriversAggregateArgs>(args: Subset<T, DriversAggregateArgs>): Prisma.PrismaPromise<GetDriversAggregateType<T>>

    /**
     * Group by Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends driversGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: driversGroupByArgs['orderBy'] }
        : { orderBy?: driversGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, driversGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriversGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the drivers model
   */
  readonly fields: driversFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for drivers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__driversClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    children<T extends drivers$childrenArgs<ExtArgs> = {}>(args?: Subset<T, drivers$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trips<T extends drivers$tripsArgs<ExtArgs> = {}>(args?: Subset<T, drivers$tripsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the drivers model
   */
  interface driversFieldRefs {
    readonly id: FieldRef<"drivers", 'Int'>
    readonly driver_name: FieldRef<"drivers", 'String'>
    readonly phone: FieldRef<"drivers", 'String'>
    readonly email: FieldRef<"drivers", 'String'>
    readonly password: FieldRef<"drivers", 'String'>
    readonly driver_license: FieldRef<"drivers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * drivers findUnique
   */
  export type driversFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers findUniqueOrThrow
   */
  export type driversFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers findFirst
   */
  export type driversFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers findFirstOrThrow
   */
  export type driversFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers findMany
   */
  export type driversFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers create
   */
  export type driversCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * The data needed to create a drivers.
     */
    data: XOR<driversCreateInput, driversUncheckedCreateInput>
  }

  /**
   * drivers createMany
   */
  export type driversCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * drivers createManyAndReturn
   */
  export type driversCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * drivers update
   */
  export type driversUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * The data needed to update a drivers.
     */
    data: XOR<driversUpdateInput, driversUncheckedUpdateInput>
    /**
     * Choose, which drivers to update.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers updateMany
   */
  export type driversUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update drivers.
     */
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyInput>
    /**
     * Filter which drivers to update
     */
    where?: driversWhereInput
    /**
     * Limit how many drivers to update.
     */
    limit?: number
  }

  /**
   * drivers updateManyAndReturn
   */
  export type driversUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * The data used to update drivers.
     */
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyInput>
    /**
     * Filter which drivers to update
     */
    where?: driversWhereInput
    /**
     * Limit how many drivers to update.
     */
    limit?: number
  }

  /**
   * drivers upsert
   */
  export type driversUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * The filter to search for the drivers to update in case it exists.
     */
    where: driversWhereUniqueInput
    /**
     * In case the drivers found by the `where` argument doesn't exist, create a new drivers with this data.
     */
    create: XOR<driversCreateInput, driversUncheckedCreateInput>
    /**
     * In case the drivers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<driversUpdateInput, driversUncheckedUpdateInput>
  }

  /**
   * drivers delete
   */
  export type driversDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter which drivers to delete.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers deleteMany
   */
  export type driversDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drivers to delete
     */
    where?: driversWhereInput
    /**
     * Limit how many drivers to delete.
     */
    limit?: number
  }

  /**
   * drivers.children
   */
  export type drivers$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    where?: childrenWhereInput
    orderBy?: childrenOrderByWithRelationInput | childrenOrderByWithRelationInput[]
    cursor?: childrenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * drivers.trips
   */
  export type drivers$tripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    where?: tripsWhereInput
    orderBy?: tripsOrderByWithRelationInput | tripsOrderByWithRelationInput[]
    cursor?: tripsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TripsScalarFieldEnum | TripsScalarFieldEnum[]
  }

  /**
   * drivers without action
   */
  export type driversDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
  }


  /**
   * Model guardians
   */

  export type AggregateGuardians = {
    _count: GuardiansCountAggregateOutputType | null
    _avg: GuardiansAvgAggregateOutputType | null
    _sum: GuardiansSumAggregateOutputType | null
    _min: GuardiansMinAggregateOutputType | null
    _max: GuardiansMaxAggregateOutputType | null
  }

  export type GuardiansAvgAggregateOutputType = {
    id: number | null
  }

  export type GuardiansSumAggregateOutputType = {
    id: number | null
  }

  export type GuardiansMinAggregateOutputType = {
    id: number | null
    guardian_name: string | null
    phone: string | null
    email: string | null
    password: string | null
  }

  export type GuardiansMaxAggregateOutputType = {
    id: number | null
    guardian_name: string | null
    phone: string | null
    email: string | null
    password: string | null
  }

  export type GuardiansCountAggregateOutputType = {
    id: number
    guardian_name: number
    phone: number
    email: number
    password: number
    _all: number
  }


  export type GuardiansAvgAggregateInputType = {
    id?: true
  }

  export type GuardiansSumAggregateInputType = {
    id?: true
  }

  export type GuardiansMinAggregateInputType = {
    id?: true
    guardian_name?: true
    phone?: true
    email?: true
    password?: true
  }

  export type GuardiansMaxAggregateInputType = {
    id?: true
    guardian_name?: true
    phone?: true
    email?: true
    password?: true
  }

  export type GuardiansCountAggregateInputType = {
    id?: true
    guardian_name?: true
    phone?: true
    email?: true
    password?: true
    _all?: true
  }

  export type GuardiansAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guardians to aggregate.
     */
    where?: guardiansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guardians to fetch.
     */
    orderBy?: guardiansOrderByWithRelationInput | guardiansOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: guardiansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guardians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned guardians
    **/
    _count?: true | GuardiansCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuardiansAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuardiansSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuardiansMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuardiansMaxAggregateInputType
  }

  export type GetGuardiansAggregateType<T extends GuardiansAggregateArgs> = {
        [P in keyof T & keyof AggregateGuardians]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuardians[P]>
      : GetScalarType<T[P], AggregateGuardians[P]>
  }




  export type guardiansGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: guardiansWhereInput
    orderBy?: guardiansOrderByWithAggregationInput | guardiansOrderByWithAggregationInput[]
    by: GuardiansScalarFieldEnum[] | GuardiansScalarFieldEnum
    having?: guardiansScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuardiansCountAggregateInputType | true
    _avg?: GuardiansAvgAggregateInputType
    _sum?: GuardiansSumAggregateInputType
    _min?: GuardiansMinAggregateInputType
    _max?: GuardiansMaxAggregateInputType
  }

  export type GuardiansGroupByOutputType = {
    id: number
    guardian_name: string
    phone: string
    email: string
    password: string
    _count: GuardiansCountAggregateOutputType | null
    _avg: GuardiansAvgAggregateOutputType | null
    _sum: GuardiansSumAggregateOutputType | null
    _min: GuardiansMinAggregateOutputType | null
    _max: GuardiansMaxAggregateOutputType | null
  }

  type GetGuardiansGroupByPayload<T extends guardiansGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuardiansGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuardiansGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuardiansGroupByOutputType[P]>
            : GetScalarType<T[P], GuardiansGroupByOutputType[P]>
        }
      >
    >


  export type guardiansSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guardian_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
    children?: boolean | guardians$childrenArgs<ExtArgs>
    _count?: boolean | GuardiansCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guardians"]>

  export type guardiansSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guardian_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["guardians"]>

  export type guardiansSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guardian_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["guardians"]>

  export type guardiansSelectScalar = {
    id?: boolean
    guardian_name?: boolean
    phone?: boolean
    email?: boolean
    password?: boolean
  }

  export type guardiansOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "guardian_name" | "phone" | "email" | "password", ExtArgs["result"]["guardians"]>
  export type guardiansInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | guardians$childrenArgs<ExtArgs>
    _count?: boolean | GuardiansCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type guardiansIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type guardiansIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $guardiansPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "guardians"
    objects: {
      children: Prisma.$childrenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      guardian_name: string
      phone: string
      email: string
      password: string
    }, ExtArgs["result"]["guardians"]>
    composites: {}
  }

  type guardiansGetPayload<S extends boolean | null | undefined | guardiansDefaultArgs> = $Result.GetResult<Prisma.$guardiansPayload, S>

  type guardiansCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<guardiansFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuardiansCountAggregateInputType | true
    }

  export interface guardiansDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['guardians'], meta: { name: 'guardians' } }
    /**
     * Find zero or one Guardians that matches the filter.
     * @param {guardiansFindUniqueArgs} args - Arguments to find a Guardians
     * @example
     * // Get one Guardians
     * const guardians = await prisma.guardians.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends guardiansFindUniqueArgs>(args: SelectSubset<T, guardiansFindUniqueArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guardians that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {guardiansFindUniqueOrThrowArgs} args - Arguments to find a Guardians
     * @example
     * // Get one Guardians
     * const guardians = await prisma.guardians.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends guardiansFindUniqueOrThrowArgs>(args: SelectSubset<T, guardiansFindUniqueOrThrowArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guardians that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guardiansFindFirstArgs} args - Arguments to find a Guardians
     * @example
     * // Get one Guardians
     * const guardians = await prisma.guardians.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends guardiansFindFirstArgs>(args?: SelectSubset<T, guardiansFindFirstArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guardians that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guardiansFindFirstOrThrowArgs} args - Arguments to find a Guardians
     * @example
     * // Get one Guardians
     * const guardians = await prisma.guardians.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends guardiansFindFirstOrThrowArgs>(args?: SelectSubset<T, guardiansFindFirstOrThrowArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guardians that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guardiansFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guardians
     * const guardians = await prisma.guardians.findMany()
     * 
     * // Get first 10 Guardians
     * const guardians = await prisma.guardians.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guardiansWithIdOnly = await prisma.guardians.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends guardiansFindManyArgs>(args?: SelectSubset<T, guardiansFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guardians.
     * @param {guardiansCreateArgs} args - Arguments to create a Guardians.
     * @example
     * // Create one Guardians
     * const Guardians = await prisma.guardians.create({
     *   data: {
     *     // ... data to create a Guardians
     *   }
     * })
     * 
     */
    create<T extends guardiansCreateArgs>(args: SelectSubset<T, guardiansCreateArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guardians.
     * @param {guardiansCreateManyArgs} args - Arguments to create many Guardians.
     * @example
     * // Create many Guardians
     * const guardians = await prisma.guardians.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends guardiansCreateManyArgs>(args?: SelectSubset<T, guardiansCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guardians and returns the data saved in the database.
     * @param {guardiansCreateManyAndReturnArgs} args - Arguments to create many Guardians.
     * @example
     * // Create many Guardians
     * const guardians = await prisma.guardians.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guardians and only return the `id`
     * const guardiansWithIdOnly = await prisma.guardians.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends guardiansCreateManyAndReturnArgs>(args?: SelectSubset<T, guardiansCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guardians.
     * @param {guardiansDeleteArgs} args - Arguments to delete one Guardians.
     * @example
     * // Delete one Guardians
     * const Guardians = await prisma.guardians.delete({
     *   where: {
     *     // ... filter to delete one Guardians
     *   }
     * })
     * 
     */
    delete<T extends guardiansDeleteArgs>(args: SelectSubset<T, guardiansDeleteArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guardians.
     * @param {guardiansUpdateArgs} args - Arguments to update one Guardians.
     * @example
     * // Update one Guardians
     * const guardians = await prisma.guardians.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends guardiansUpdateArgs>(args: SelectSubset<T, guardiansUpdateArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guardians.
     * @param {guardiansDeleteManyArgs} args - Arguments to filter Guardians to delete.
     * @example
     * // Delete a few Guardians
     * const { count } = await prisma.guardians.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends guardiansDeleteManyArgs>(args?: SelectSubset<T, guardiansDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guardians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guardiansUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guardians
     * const guardians = await prisma.guardians.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends guardiansUpdateManyArgs>(args: SelectSubset<T, guardiansUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guardians and returns the data updated in the database.
     * @param {guardiansUpdateManyAndReturnArgs} args - Arguments to update many Guardians.
     * @example
     * // Update many Guardians
     * const guardians = await prisma.guardians.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guardians and only return the `id`
     * const guardiansWithIdOnly = await prisma.guardians.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends guardiansUpdateManyAndReturnArgs>(args: SelectSubset<T, guardiansUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guardians.
     * @param {guardiansUpsertArgs} args - Arguments to update or create a Guardians.
     * @example
     * // Update or create a Guardians
     * const guardians = await prisma.guardians.upsert({
     *   create: {
     *     // ... data to create a Guardians
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guardians we want to update
     *   }
     * })
     */
    upsert<T extends guardiansUpsertArgs>(args: SelectSubset<T, guardiansUpsertArgs<ExtArgs>>): Prisma__guardiansClient<$Result.GetResult<Prisma.$guardiansPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guardians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guardiansCountArgs} args - Arguments to filter Guardians to count.
     * @example
     * // Count the number of Guardians
     * const count = await prisma.guardians.count({
     *   where: {
     *     // ... the filter for the Guardians we want to count
     *   }
     * })
    **/
    count<T extends guardiansCountArgs>(
      args?: Subset<T, guardiansCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuardiansCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guardians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuardiansAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuardiansAggregateArgs>(args: Subset<T, GuardiansAggregateArgs>): Prisma.PrismaPromise<GetGuardiansAggregateType<T>>

    /**
     * Group by Guardians.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guardiansGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends guardiansGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: guardiansGroupByArgs['orderBy'] }
        : { orderBy?: guardiansGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, guardiansGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuardiansGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the guardians model
   */
  readonly fields: guardiansFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for guardians.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__guardiansClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    children<T extends guardians$childrenArgs<ExtArgs> = {}>(args?: Subset<T, guardians$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$childrenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the guardians model
   */
  interface guardiansFieldRefs {
    readonly id: FieldRef<"guardians", 'Int'>
    readonly guardian_name: FieldRef<"guardians", 'String'>
    readonly phone: FieldRef<"guardians", 'String'>
    readonly email: FieldRef<"guardians", 'String'>
    readonly password: FieldRef<"guardians", 'String'>
  }
    

  // Custom InputTypes
  /**
   * guardians findUnique
   */
  export type guardiansFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * Filter, which guardians to fetch.
     */
    where: guardiansWhereUniqueInput
  }

  /**
   * guardians findUniqueOrThrow
   */
  export type guardiansFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * Filter, which guardians to fetch.
     */
    where: guardiansWhereUniqueInput
  }

  /**
   * guardians findFirst
   */
  export type guardiansFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * Filter, which guardians to fetch.
     */
    where?: guardiansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guardians to fetch.
     */
    orderBy?: guardiansOrderByWithRelationInput | guardiansOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guardians.
     */
    cursor?: guardiansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guardians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guardians.
     */
    distinct?: GuardiansScalarFieldEnum | GuardiansScalarFieldEnum[]
  }

  /**
   * guardians findFirstOrThrow
   */
  export type guardiansFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * Filter, which guardians to fetch.
     */
    where?: guardiansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guardians to fetch.
     */
    orderBy?: guardiansOrderByWithRelationInput | guardiansOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guardians.
     */
    cursor?: guardiansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guardians.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guardians.
     */
    distinct?: GuardiansScalarFieldEnum | GuardiansScalarFieldEnum[]
  }

  /**
   * guardians findMany
   */
  export type guardiansFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * Filter, which guardians to fetch.
     */
    where?: guardiansWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guardians to fetch.
     */
    orderBy?: guardiansOrderByWithRelationInput | guardiansOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing guardians.
     */
    cursor?: guardiansWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guardians from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guardians.
     */
    skip?: number
    distinct?: GuardiansScalarFieldEnum | GuardiansScalarFieldEnum[]
  }

  /**
   * guardians create
   */
  export type guardiansCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * The data needed to create a guardians.
     */
    data: XOR<guardiansCreateInput, guardiansUncheckedCreateInput>
  }

  /**
   * guardians createMany
   */
  export type guardiansCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many guardians.
     */
    data: guardiansCreateManyInput | guardiansCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * guardians createManyAndReturn
   */
  export type guardiansCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * The data used to create many guardians.
     */
    data: guardiansCreateManyInput | guardiansCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * guardians update
   */
  export type guardiansUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * The data needed to update a guardians.
     */
    data: XOR<guardiansUpdateInput, guardiansUncheckedUpdateInput>
    /**
     * Choose, which guardians to update.
     */
    where: guardiansWhereUniqueInput
  }

  /**
   * guardians updateMany
   */
  export type guardiansUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update guardians.
     */
    data: XOR<guardiansUpdateManyMutationInput, guardiansUncheckedUpdateManyInput>
    /**
     * Filter which guardians to update
     */
    where?: guardiansWhereInput
    /**
     * Limit how many guardians to update.
     */
    limit?: number
  }

  /**
   * guardians updateManyAndReturn
   */
  export type guardiansUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * The data used to update guardians.
     */
    data: XOR<guardiansUpdateManyMutationInput, guardiansUncheckedUpdateManyInput>
    /**
     * Filter which guardians to update
     */
    where?: guardiansWhereInput
    /**
     * Limit how many guardians to update.
     */
    limit?: number
  }

  /**
   * guardians upsert
   */
  export type guardiansUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * The filter to search for the guardians to update in case it exists.
     */
    where: guardiansWhereUniqueInput
    /**
     * In case the guardians found by the `where` argument doesn't exist, create a new guardians with this data.
     */
    create: XOR<guardiansCreateInput, guardiansUncheckedCreateInput>
    /**
     * In case the guardians was found with the provided `where` argument, update it with this data.
     */
    update: XOR<guardiansUpdateInput, guardiansUncheckedUpdateInput>
  }

  /**
   * guardians delete
   */
  export type guardiansDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
    /**
     * Filter which guardians to delete.
     */
    where: guardiansWhereUniqueInput
  }

  /**
   * guardians deleteMany
   */
  export type guardiansDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guardians to delete
     */
    where?: guardiansWhereInput
    /**
     * Limit how many guardians to delete.
     */
    limit?: number
  }

  /**
   * guardians.children
   */
  export type guardians$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the children
     */
    select?: childrenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the children
     */
    omit?: childrenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: childrenInclude<ExtArgs> | null
    where?: childrenWhereInput
    orderBy?: childrenOrderByWithRelationInput | childrenOrderByWithRelationInput[]
    cursor?: childrenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChildrenScalarFieldEnum | ChildrenScalarFieldEnum[]
  }

  /**
   * guardians without action
   */
  export type guardiansDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guardians
     */
    select?: guardiansSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guardians
     */
    omit?: guardiansOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guardiansInclude<ExtArgs> | null
  }


  /**
   * Model trips
   */

  export type AggregateTrips = {
    _count: TripsCountAggregateOutputType | null
    _avg: TripsAvgAggregateOutputType | null
    _sum: TripsSumAggregateOutputType | null
    _min: TripsMinAggregateOutputType | null
    _max: TripsMaxAggregateOutputType | null
  }

  export type TripsAvgAggregateOutputType = {
    id: number | null
    driver_id: number | null
    children_ids: number | null
  }

  export type TripsSumAggregateOutputType = {
    id: number | null
    driver_id: number | null
    children_ids: number[]
  }

  export type TripsMinAggregateOutputType = {
    id: number | null
    driver_id: number | null
    departure_time: Date | null
    arrival_time: Date | null
    trip_date: Date | null
  }

  export type TripsMaxAggregateOutputType = {
    id: number | null
    driver_id: number | null
    departure_time: Date | null
    arrival_time: Date | null
    trip_date: Date | null
  }

  export type TripsCountAggregateOutputType = {
    id: number
    driver_id: number
    children_ids: number
    departure_time: number
    arrival_time: number
    trip_date: number
    _all: number
  }


  export type TripsAvgAggregateInputType = {
    id?: true
    driver_id?: true
    children_ids?: true
  }

  export type TripsSumAggregateInputType = {
    id?: true
    driver_id?: true
    children_ids?: true
  }

  export type TripsMinAggregateInputType = {
    id?: true
    driver_id?: true
    departure_time?: true
    arrival_time?: true
    trip_date?: true
  }

  export type TripsMaxAggregateInputType = {
    id?: true
    driver_id?: true
    departure_time?: true
    arrival_time?: true
    trip_date?: true
  }

  export type TripsCountAggregateInputType = {
    id?: true
    driver_id?: true
    children_ids?: true
    departure_time?: true
    arrival_time?: true
    trip_date?: true
    _all?: true
  }

  export type TripsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which trips to aggregate.
     */
    where?: tripsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripsOrderByWithRelationInput | tripsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tripsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned trips
    **/
    _count?: true | TripsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TripsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TripsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripsMaxAggregateInputType
  }

  export type GetTripsAggregateType<T extends TripsAggregateArgs> = {
        [P in keyof T & keyof AggregateTrips]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrips[P]>
      : GetScalarType<T[P], AggregateTrips[P]>
  }




  export type tripsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tripsWhereInput
    orderBy?: tripsOrderByWithAggregationInput | tripsOrderByWithAggregationInput[]
    by: TripsScalarFieldEnum[] | TripsScalarFieldEnum
    having?: tripsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripsCountAggregateInputType | true
    _avg?: TripsAvgAggregateInputType
    _sum?: TripsSumAggregateInputType
    _min?: TripsMinAggregateInputType
    _max?: TripsMaxAggregateInputType
  }

  export type TripsGroupByOutputType = {
    id: number
    driver_id: number | null
    children_ids: number[]
    departure_time: Date | null
    arrival_time: Date | null
    trip_date: Date | null
    _count: TripsCountAggregateOutputType | null
    _avg: TripsAvgAggregateOutputType | null
    _sum: TripsSumAggregateOutputType | null
    _min: TripsMinAggregateOutputType | null
    _max: TripsMaxAggregateOutputType | null
  }

  type GetTripsGroupByPayload<T extends tripsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TripsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripsGroupByOutputType[P]>
            : GetScalarType<T[P], TripsGroupByOutputType[P]>
        }
      >
    >


  export type tripsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driver_id?: boolean
    children_ids?: boolean
    departure_time?: boolean
    arrival_time?: boolean
    trip_date?: boolean
    drivers?: boolean | trips$driversArgs<ExtArgs>
  }, ExtArgs["result"]["trips"]>

  export type tripsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driver_id?: boolean
    children_ids?: boolean
    departure_time?: boolean
    arrival_time?: boolean
    trip_date?: boolean
    drivers?: boolean | trips$driversArgs<ExtArgs>
  }, ExtArgs["result"]["trips"]>

  export type tripsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    driver_id?: boolean
    children_ids?: boolean
    departure_time?: boolean
    arrival_time?: boolean
    trip_date?: boolean
    drivers?: boolean | trips$driversArgs<ExtArgs>
  }, ExtArgs["result"]["trips"]>

  export type tripsSelectScalar = {
    id?: boolean
    driver_id?: boolean
    children_ids?: boolean
    departure_time?: boolean
    arrival_time?: boolean
    trip_date?: boolean
  }

  export type tripsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "driver_id" | "children_ids" | "departure_time" | "arrival_time" | "trip_date", ExtArgs["result"]["trips"]>
  export type tripsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | trips$driversArgs<ExtArgs>
  }
  export type tripsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | trips$driversArgs<ExtArgs>
  }
  export type tripsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | trips$driversArgs<ExtArgs>
  }

  export type $tripsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "trips"
    objects: {
      drivers: Prisma.$driversPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      driver_id: number | null
      children_ids: number[]
      departure_time: Date | null
      arrival_time: Date | null
      trip_date: Date | null
    }, ExtArgs["result"]["trips"]>
    composites: {}
  }

  type tripsGetPayload<S extends boolean | null | undefined | tripsDefaultArgs> = $Result.GetResult<Prisma.$tripsPayload, S>

  type tripsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tripsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TripsCountAggregateInputType | true
    }

  export interface tripsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['trips'], meta: { name: 'trips' } }
    /**
     * Find zero or one Trips that matches the filter.
     * @param {tripsFindUniqueArgs} args - Arguments to find a Trips
     * @example
     * // Get one Trips
     * const trips = await prisma.trips.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tripsFindUniqueArgs>(args: SelectSubset<T, tripsFindUniqueArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trips that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tripsFindUniqueOrThrowArgs} args - Arguments to find a Trips
     * @example
     * // Get one Trips
     * const trips = await prisma.trips.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tripsFindUniqueOrThrowArgs>(args: SelectSubset<T, tripsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripsFindFirstArgs} args - Arguments to find a Trips
     * @example
     * // Get one Trips
     * const trips = await prisma.trips.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tripsFindFirstArgs>(args?: SelectSubset<T, tripsFindFirstArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trips that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripsFindFirstOrThrowArgs} args - Arguments to find a Trips
     * @example
     * // Get one Trips
     * const trips = await prisma.trips.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tripsFindFirstOrThrowArgs>(args?: SelectSubset<T, tripsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trips
     * const trips = await prisma.trips.findMany()
     * 
     * // Get first 10 Trips
     * const trips = await prisma.trips.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripsWithIdOnly = await prisma.trips.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tripsFindManyArgs>(args?: SelectSubset<T, tripsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trips.
     * @param {tripsCreateArgs} args - Arguments to create a Trips.
     * @example
     * // Create one Trips
     * const Trips = await prisma.trips.create({
     *   data: {
     *     // ... data to create a Trips
     *   }
     * })
     * 
     */
    create<T extends tripsCreateArgs>(args: SelectSubset<T, tripsCreateArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trips.
     * @param {tripsCreateManyArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trips = await prisma.trips.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tripsCreateManyArgs>(args?: SelectSubset<T, tripsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trips and returns the data saved in the database.
     * @param {tripsCreateManyAndReturnArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trips = await prisma.trips.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trips and only return the `id`
     * const tripsWithIdOnly = await prisma.trips.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tripsCreateManyAndReturnArgs>(args?: SelectSubset<T, tripsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trips.
     * @param {tripsDeleteArgs} args - Arguments to delete one Trips.
     * @example
     * // Delete one Trips
     * const Trips = await prisma.trips.delete({
     *   where: {
     *     // ... filter to delete one Trips
     *   }
     * })
     * 
     */
    delete<T extends tripsDeleteArgs>(args: SelectSubset<T, tripsDeleteArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trips.
     * @param {tripsUpdateArgs} args - Arguments to update one Trips.
     * @example
     * // Update one Trips
     * const trips = await prisma.trips.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tripsUpdateArgs>(args: SelectSubset<T, tripsUpdateArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trips.
     * @param {tripsDeleteManyArgs} args - Arguments to filter Trips to delete.
     * @example
     * // Delete a few Trips
     * const { count } = await prisma.trips.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tripsDeleteManyArgs>(args?: SelectSubset<T, tripsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trips
     * const trips = await prisma.trips.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tripsUpdateManyArgs>(args: SelectSubset<T, tripsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips and returns the data updated in the database.
     * @param {tripsUpdateManyAndReturnArgs} args - Arguments to update many Trips.
     * @example
     * // Update many Trips
     * const trips = await prisma.trips.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trips and only return the `id`
     * const tripsWithIdOnly = await prisma.trips.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tripsUpdateManyAndReturnArgs>(args: SelectSubset<T, tripsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trips.
     * @param {tripsUpsertArgs} args - Arguments to update or create a Trips.
     * @example
     * // Update or create a Trips
     * const trips = await prisma.trips.upsert({
     *   create: {
     *     // ... data to create a Trips
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trips we want to update
     *   }
     * })
     */
    upsert<T extends tripsUpsertArgs>(args: SelectSubset<T, tripsUpsertArgs<ExtArgs>>): Prisma__tripsClient<$Result.GetResult<Prisma.$tripsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripsCountArgs} args - Arguments to filter Trips to count.
     * @example
     * // Count the number of Trips
     * const count = await prisma.trips.count({
     *   where: {
     *     // ... the filter for the Trips we want to count
     *   }
     * })
    **/
    count<T extends tripsCountArgs>(
      args?: Subset<T, tripsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripsAggregateArgs>(args: Subset<T, TripsAggregateArgs>): Prisma.PrismaPromise<GetTripsAggregateType<T>>

    /**
     * Group by Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tripsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tripsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tripsGroupByArgs['orderBy'] }
        : { orderBy?: tripsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tripsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the trips model
   */
  readonly fields: tripsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for trips.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tripsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    drivers<T extends trips$driversArgs<ExtArgs> = {}>(args?: Subset<T, trips$driversArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the trips model
   */
  interface tripsFieldRefs {
    readonly id: FieldRef<"trips", 'Int'>
    readonly driver_id: FieldRef<"trips", 'Int'>
    readonly children_ids: FieldRef<"trips", 'Int[]'>
    readonly departure_time: FieldRef<"trips", 'DateTime'>
    readonly arrival_time: FieldRef<"trips", 'DateTime'>
    readonly trip_date: FieldRef<"trips", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * trips findUnique
   */
  export type tripsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * Filter, which trips to fetch.
     */
    where: tripsWhereUniqueInput
  }

  /**
   * trips findUniqueOrThrow
   */
  export type tripsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * Filter, which trips to fetch.
     */
    where: tripsWhereUniqueInput
  }

  /**
   * trips findFirst
   */
  export type tripsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * Filter, which trips to fetch.
     */
    where?: tripsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripsOrderByWithRelationInput | tripsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trips.
     */
    cursor?: tripsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trips.
     */
    distinct?: TripsScalarFieldEnum | TripsScalarFieldEnum[]
  }

  /**
   * trips findFirstOrThrow
   */
  export type tripsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * Filter, which trips to fetch.
     */
    where?: tripsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripsOrderByWithRelationInput | tripsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trips.
     */
    cursor?: tripsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trips.
     */
    distinct?: TripsScalarFieldEnum | TripsScalarFieldEnum[]
  }

  /**
   * trips findMany
   */
  export type tripsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * Filter, which trips to fetch.
     */
    where?: tripsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trips to fetch.
     */
    orderBy?: tripsOrderByWithRelationInput | tripsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing trips.
     */
    cursor?: tripsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trips.
     */
    skip?: number
    distinct?: TripsScalarFieldEnum | TripsScalarFieldEnum[]
  }

  /**
   * trips create
   */
  export type tripsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * The data needed to create a trips.
     */
    data?: XOR<tripsCreateInput, tripsUncheckedCreateInput>
  }

  /**
   * trips createMany
   */
  export type tripsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many trips.
     */
    data: tripsCreateManyInput | tripsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * trips createManyAndReturn
   */
  export type tripsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * The data used to create many trips.
     */
    data: tripsCreateManyInput | tripsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * trips update
   */
  export type tripsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * The data needed to update a trips.
     */
    data: XOR<tripsUpdateInput, tripsUncheckedUpdateInput>
    /**
     * Choose, which trips to update.
     */
    where: tripsWhereUniqueInput
  }

  /**
   * trips updateMany
   */
  export type tripsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update trips.
     */
    data: XOR<tripsUpdateManyMutationInput, tripsUncheckedUpdateManyInput>
    /**
     * Filter which trips to update
     */
    where?: tripsWhereInput
    /**
     * Limit how many trips to update.
     */
    limit?: number
  }

  /**
   * trips updateManyAndReturn
   */
  export type tripsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * The data used to update trips.
     */
    data: XOR<tripsUpdateManyMutationInput, tripsUncheckedUpdateManyInput>
    /**
     * Filter which trips to update
     */
    where?: tripsWhereInput
    /**
     * Limit how many trips to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * trips upsert
   */
  export type tripsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * The filter to search for the trips to update in case it exists.
     */
    where: tripsWhereUniqueInput
    /**
     * In case the trips found by the `where` argument doesn't exist, create a new trips with this data.
     */
    create: XOR<tripsCreateInput, tripsUncheckedCreateInput>
    /**
     * In case the trips was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tripsUpdateInput, tripsUncheckedUpdateInput>
  }

  /**
   * trips delete
   */
  export type tripsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
    /**
     * Filter which trips to delete.
     */
    where: tripsWhereUniqueInput
  }

  /**
   * trips deleteMany
   */
  export type tripsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which trips to delete
     */
    where?: tripsWhereInput
    /**
     * Limit how many trips to delete.
     */
    limit?: number
  }

  /**
   * trips.drivers
   */
  export type trips$driversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Omit specific fields from the drivers
     */
    omit?: driversOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    where?: driversWhereInput
  }

  /**
   * trips without action
   */
  export type tripsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the trips
     */
    select?: tripsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the trips
     */
    omit?: tripsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tripsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ChildrenScalarFieldEnum: {
    id: 'id',
    child_name: 'child_name',
    starting_point: 'starting_point',
    destination: 'destination',
    guardian_id: 'guardian_id',
    driver_id: 'driver_id',
    birth_date: 'birth_date',
    school: 'school'
  };

  export type ChildrenScalarFieldEnum = (typeof ChildrenScalarFieldEnum)[keyof typeof ChildrenScalarFieldEnum]


  export const DriversScalarFieldEnum: {
    id: 'id',
    driver_name: 'driver_name',
    phone: 'phone',
    email: 'email',
    password: 'password',
    driver_license: 'driver_license'
  };

  export type DriversScalarFieldEnum = (typeof DriversScalarFieldEnum)[keyof typeof DriversScalarFieldEnum]


  export const GuardiansScalarFieldEnum: {
    id: 'id',
    guardian_name: 'guardian_name',
    phone: 'phone',
    email: 'email',
    password: 'password'
  };

  export type GuardiansScalarFieldEnum = (typeof GuardiansScalarFieldEnum)[keyof typeof GuardiansScalarFieldEnum]


  export const TripsScalarFieldEnum: {
    id: 'id',
    driver_id: 'driver_id',
    children_ids: 'children_ids',
    departure_time: 'departure_time',
    arrival_time: 'arrival_time',
    trip_date: 'trip_date'
  };

  export type TripsScalarFieldEnum = (typeof TripsScalarFieldEnum)[keyof typeof TripsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type childrenWhereInput = {
    AND?: childrenWhereInput | childrenWhereInput[]
    OR?: childrenWhereInput[]
    NOT?: childrenWhereInput | childrenWhereInput[]
    id?: IntFilter<"children"> | number
    child_name?: StringFilter<"children"> | string
    starting_point?: StringFilter<"children"> | string
    destination?: StringFilter<"children"> | string
    guardian_id?: IntNullableFilter<"children"> | number | null
    driver_id?: IntNullableFilter<"children"> | number | null
    birth_date?: DateTimeNullableFilter<"children"> | Date | string | null
    school?: StringNullableFilter<"children"> | string | null
    drivers?: XOR<DriversNullableScalarRelationFilter, driversWhereInput> | null
    guardians?: XOR<GuardiansNullableScalarRelationFilter, guardiansWhereInput> | null
  }

  export type childrenOrderByWithRelationInput = {
    id?: SortOrder
    child_name?: SortOrder
    starting_point?: SortOrder
    destination?: SortOrder
    guardian_id?: SortOrderInput | SortOrder
    driver_id?: SortOrderInput | SortOrder
    birth_date?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    drivers?: driversOrderByWithRelationInput
    guardians?: guardiansOrderByWithRelationInput
  }

  export type childrenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: childrenWhereInput | childrenWhereInput[]
    OR?: childrenWhereInput[]
    NOT?: childrenWhereInput | childrenWhereInput[]
    child_name?: StringFilter<"children"> | string
    starting_point?: StringFilter<"children"> | string
    destination?: StringFilter<"children"> | string
    guardian_id?: IntNullableFilter<"children"> | number | null
    driver_id?: IntNullableFilter<"children"> | number | null
    birth_date?: DateTimeNullableFilter<"children"> | Date | string | null
    school?: StringNullableFilter<"children"> | string | null
    drivers?: XOR<DriversNullableScalarRelationFilter, driversWhereInput> | null
    guardians?: XOR<GuardiansNullableScalarRelationFilter, guardiansWhereInput> | null
  }, "id">

  export type childrenOrderByWithAggregationInput = {
    id?: SortOrder
    child_name?: SortOrder
    starting_point?: SortOrder
    destination?: SortOrder
    guardian_id?: SortOrderInput | SortOrder
    driver_id?: SortOrderInput | SortOrder
    birth_date?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    _count?: childrenCountOrderByAggregateInput
    _avg?: childrenAvgOrderByAggregateInput
    _max?: childrenMaxOrderByAggregateInput
    _min?: childrenMinOrderByAggregateInput
    _sum?: childrenSumOrderByAggregateInput
  }

  export type childrenScalarWhereWithAggregatesInput = {
    AND?: childrenScalarWhereWithAggregatesInput | childrenScalarWhereWithAggregatesInput[]
    OR?: childrenScalarWhereWithAggregatesInput[]
    NOT?: childrenScalarWhereWithAggregatesInput | childrenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"children"> | number
    child_name?: StringWithAggregatesFilter<"children"> | string
    starting_point?: StringWithAggregatesFilter<"children"> | string
    destination?: StringWithAggregatesFilter<"children"> | string
    guardian_id?: IntNullableWithAggregatesFilter<"children"> | number | null
    driver_id?: IntNullableWithAggregatesFilter<"children"> | number | null
    birth_date?: DateTimeNullableWithAggregatesFilter<"children"> | Date | string | null
    school?: StringNullableWithAggregatesFilter<"children"> | string | null
  }

  export type driversWhereInput = {
    AND?: driversWhereInput | driversWhereInput[]
    OR?: driversWhereInput[]
    NOT?: driversWhereInput | driversWhereInput[]
    id?: IntFilter<"drivers"> | number
    driver_name?: StringFilter<"drivers"> | string
    phone?: StringFilter<"drivers"> | string
    email?: StringFilter<"drivers"> | string
    password?: StringFilter<"drivers"> | string
    driver_license?: StringFilter<"drivers"> | string
    children?: ChildrenListRelationFilter
    trips?: TripsListRelationFilter
  }

  export type driversOrderByWithRelationInput = {
    id?: SortOrder
    driver_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    driver_license?: SortOrder
    children?: childrenOrderByRelationAggregateInput
    trips?: tripsOrderByRelationAggregateInput
  }

  export type driversWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: driversWhereInput | driversWhereInput[]
    OR?: driversWhereInput[]
    NOT?: driversWhereInput | driversWhereInput[]
    driver_name?: StringFilter<"drivers"> | string
    phone?: StringFilter<"drivers"> | string
    password?: StringFilter<"drivers"> | string
    driver_license?: StringFilter<"drivers"> | string
    children?: ChildrenListRelationFilter
    trips?: TripsListRelationFilter
  }, "id" | "email">

  export type driversOrderByWithAggregationInput = {
    id?: SortOrder
    driver_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    driver_license?: SortOrder
    _count?: driversCountOrderByAggregateInput
    _avg?: driversAvgOrderByAggregateInput
    _max?: driversMaxOrderByAggregateInput
    _min?: driversMinOrderByAggregateInput
    _sum?: driversSumOrderByAggregateInput
  }

  export type driversScalarWhereWithAggregatesInput = {
    AND?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[]
    OR?: driversScalarWhereWithAggregatesInput[]
    NOT?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"drivers"> | number
    driver_name?: StringWithAggregatesFilter<"drivers"> | string
    phone?: StringWithAggregatesFilter<"drivers"> | string
    email?: StringWithAggregatesFilter<"drivers"> | string
    password?: StringWithAggregatesFilter<"drivers"> | string
    driver_license?: StringWithAggregatesFilter<"drivers"> | string
  }

  export type guardiansWhereInput = {
    AND?: guardiansWhereInput | guardiansWhereInput[]
    OR?: guardiansWhereInput[]
    NOT?: guardiansWhereInput | guardiansWhereInput[]
    id?: IntFilter<"guardians"> | number
    guardian_name?: StringFilter<"guardians"> | string
    phone?: StringFilter<"guardians"> | string
    email?: StringFilter<"guardians"> | string
    password?: StringFilter<"guardians"> | string
    children?: ChildrenListRelationFilter
  }

  export type guardiansOrderByWithRelationInput = {
    id?: SortOrder
    guardian_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    children?: childrenOrderByRelationAggregateInput
  }

  export type guardiansWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: guardiansWhereInput | guardiansWhereInput[]
    OR?: guardiansWhereInput[]
    NOT?: guardiansWhereInput | guardiansWhereInput[]
    guardian_name?: StringFilter<"guardians"> | string
    phone?: StringFilter<"guardians"> | string
    password?: StringFilter<"guardians"> | string
    children?: ChildrenListRelationFilter
  }, "id" | "email">

  export type guardiansOrderByWithAggregationInput = {
    id?: SortOrder
    guardian_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: guardiansCountOrderByAggregateInput
    _avg?: guardiansAvgOrderByAggregateInput
    _max?: guardiansMaxOrderByAggregateInput
    _min?: guardiansMinOrderByAggregateInput
    _sum?: guardiansSumOrderByAggregateInput
  }

  export type guardiansScalarWhereWithAggregatesInput = {
    AND?: guardiansScalarWhereWithAggregatesInput | guardiansScalarWhereWithAggregatesInput[]
    OR?: guardiansScalarWhereWithAggregatesInput[]
    NOT?: guardiansScalarWhereWithAggregatesInput | guardiansScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"guardians"> | number
    guardian_name?: StringWithAggregatesFilter<"guardians"> | string
    phone?: StringWithAggregatesFilter<"guardians"> | string
    email?: StringWithAggregatesFilter<"guardians"> | string
    password?: StringWithAggregatesFilter<"guardians"> | string
  }

  export type tripsWhereInput = {
    AND?: tripsWhereInput | tripsWhereInput[]
    OR?: tripsWhereInput[]
    NOT?: tripsWhereInput | tripsWhereInput[]
    id?: IntFilter<"trips"> | number
    driver_id?: IntNullableFilter<"trips"> | number | null
    children_ids?: IntNullableListFilter<"trips">
    departure_time?: DateTimeNullableFilter<"trips"> | Date | string | null
    arrival_time?: DateTimeNullableFilter<"trips"> | Date | string | null
    trip_date?: DateTimeNullableFilter<"trips"> | Date | string | null
    drivers?: XOR<DriversNullableScalarRelationFilter, driversWhereInput> | null
  }

  export type tripsOrderByWithRelationInput = {
    id?: SortOrder
    driver_id?: SortOrderInput | SortOrder
    children_ids?: SortOrder
    departure_time?: SortOrderInput | SortOrder
    arrival_time?: SortOrderInput | SortOrder
    trip_date?: SortOrderInput | SortOrder
    drivers?: driversOrderByWithRelationInput
  }

  export type tripsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: tripsWhereInput | tripsWhereInput[]
    OR?: tripsWhereInput[]
    NOT?: tripsWhereInput | tripsWhereInput[]
    driver_id?: IntNullableFilter<"trips"> | number | null
    children_ids?: IntNullableListFilter<"trips">
    departure_time?: DateTimeNullableFilter<"trips"> | Date | string | null
    arrival_time?: DateTimeNullableFilter<"trips"> | Date | string | null
    trip_date?: DateTimeNullableFilter<"trips"> | Date | string | null
    drivers?: XOR<DriversNullableScalarRelationFilter, driversWhereInput> | null
  }, "id">

  export type tripsOrderByWithAggregationInput = {
    id?: SortOrder
    driver_id?: SortOrderInput | SortOrder
    children_ids?: SortOrder
    departure_time?: SortOrderInput | SortOrder
    arrival_time?: SortOrderInput | SortOrder
    trip_date?: SortOrderInput | SortOrder
    _count?: tripsCountOrderByAggregateInput
    _avg?: tripsAvgOrderByAggregateInput
    _max?: tripsMaxOrderByAggregateInput
    _min?: tripsMinOrderByAggregateInput
    _sum?: tripsSumOrderByAggregateInput
  }

  export type tripsScalarWhereWithAggregatesInput = {
    AND?: tripsScalarWhereWithAggregatesInput | tripsScalarWhereWithAggregatesInput[]
    OR?: tripsScalarWhereWithAggregatesInput[]
    NOT?: tripsScalarWhereWithAggregatesInput | tripsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"trips"> | number
    driver_id?: IntNullableWithAggregatesFilter<"trips"> | number | null
    children_ids?: IntNullableListFilter<"trips">
    departure_time?: DateTimeNullableWithAggregatesFilter<"trips"> | Date | string | null
    arrival_time?: DateTimeNullableWithAggregatesFilter<"trips"> | Date | string | null
    trip_date?: DateTimeNullableWithAggregatesFilter<"trips"> | Date | string | null
  }

  export type childrenCreateInput = {
    child_name: string
    starting_point: string
    destination: string
    birth_date?: Date | string | null
    school?: string | null
    drivers?: driversCreateNestedOneWithoutChildrenInput
    guardians?: guardiansCreateNestedOneWithoutChildrenInput
  }

  export type childrenUncheckedCreateInput = {
    id?: number
    child_name: string
    starting_point: string
    destination: string
    guardian_id?: number | null
    driver_id?: number | null
    birth_date?: Date | string | null
    school?: string | null
  }

  export type childrenUpdateInput = {
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    drivers?: driversUpdateOneWithoutChildrenNestedInput
    guardians?: guardiansUpdateOneWithoutChildrenNestedInput
  }

  export type childrenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    guardian_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type childrenCreateManyInput = {
    id?: number
    child_name: string
    starting_point: string
    destination: string
    guardian_id?: number | null
    driver_id?: number | null
    birth_date?: Date | string | null
    school?: string | null
  }

  export type childrenUpdateManyMutationInput = {
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type childrenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    guardian_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type driversCreateInput = {
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
    children?: childrenCreateNestedManyWithoutDriversInput
    trips?: tripsCreateNestedManyWithoutDriversInput
  }

  export type driversUncheckedCreateInput = {
    id?: number
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
    children?: childrenUncheckedCreateNestedManyWithoutDriversInput
    trips?: tripsUncheckedCreateNestedManyWithoutDriversInput
  }

  export type driversUpdateInput = {
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
    children?: childrenUpdateManyWithoutDriversNestedInput
    trips?: tripsUpdateManyWithoutDriversNestedInput
  }

  export type driversUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
    children?: childrenUncheckedUpdateManyWithoutDriversNestedInput
    trips?: tripsUncheckedUpdateManyWithoutDriversNestedInput
  }

  export type driversCreateManyInput = {
    id?: number
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
  }

  export type driversUpdateManyMutationInput = {
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
  }

  export type driversUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
  }

  export type guardiansCreateInput = {
    guardian_name: string
    phone: string
    email: string
    password: string
    children?: childrenCreateNestedManyWithoutGuardiansInput
  }

  export type guardiansUncheckedCreateInput = {
    id?: number
    guardian_name: string
    phone: string
    email: string
    password: string
    children?: childrenUncheckedCreateNestedManyWithoutGuardiansInput
  }

  export type guardiansUpdateInput = {
    guardian_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    children?: childrenUpdateManyWithoutGuardiansNestedInput
  }

  export type guardiansUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    guardian_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    children?: childrenUncheckedUpdateManyWithoutGuardiansNestedInput
  }

  export type guardiansCreateManyInput = {
    id?: number
    guardian_name: string
    phone: string
    email: string
    password: string
  }

  export type guardiansUpdateManyMutationInput = {
    guardian_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type guardiansUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    guardian_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type tripsCreateInput = {
    children_ids?: tripsCreatechildren_idsInput | number[]
    departure_time?: Date | string | null
    arrival_time?: Date | string | null
    trip_date?: Date | string | null
    drivers?: driversCreateNestedOneWithoutTripsInput
  }

  export type tripsUncheckedCreateInput = {
    id?: number
    driver_id?: number | null
    children_ids?: tripsCreatechildren_idsInput | number[]
    departure_time?: Date | string | null
    arrival_time?: Date | string | null
    trip_date?: Date | string | null
  }

  export type tripsUpdateInput = {
    children_ids?: tripsUpdatechildren_idsInput | number[]
    departure_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    arrival_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    drivers?: driversUpdateOneWithoutTripsNestedInput
  }

  export type tripsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    children_ids?: tripsUpdatechildren_idsInput | number[]
    departure_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    arrival_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tripsCreateManyInput = {
    id?: number
    driver_id?: number | null
    children_ids?: tripsCreatechildren_idsInput | number[]
    departure_time?: Date | string | null
    arrival_time?: Date | string | null
    trip_date?: Date | string | null
  }

  export type tripsUpdateManyMutationInput = {
    children_ids?: tripsUpdatechildren_idsInput | number[]
    departure_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    arrival_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tripsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    children_ids?: tripsUpdatechildren_idsInput | number[]
    departure_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    arrival_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DriversNullableScalarRelationFilter = {
    is?: driversWhereInput | null
    isNot?: driversWhereInput | null
  }

  export type GuardiansNullableScalarRelationFilter = {
    is?: guardiansWhereInput | null
    isNot?: guardiansWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type childrenCountOrderByAggregateInput = {
    id?: SortOrder
    child_name?: SortOrder
    starting_point?: SortOrder
    destination?: SortOrder
    guardian_id?: SortOrder
    driver_id?: SortOrder
    birth_date?: SortOrder
    school?: SortOrder
  }

  export type childrenAvgOrderByAggregateInput = {
    id?: SortOrder
    guardian_id?: SortOrder
    driver_id?: SortOrder
  }

  export type childrenMaxOrderByAggregateInput = {
    id?: SortOrder
    child_name?: SortOrder
    starting_point?: SortOrder
    destination?: SortOrder
    guardian_id?: SortOrder
    driver_id?: SortOrder
    birth_date?: SortOrder
    school?: SortOrder
  }

  export type childrenMinOrderByAggregateInput = {
    id?: SortOrder
    child_name?: SortOrder
    starting_point?: SortOrder
    destination?: SortOrder
    guardian_id?: SortOrder
    driver_id?: SortOrder
    birth_date?: SortOrder
    school?: SortOrder
  }

  export type childrenSumOrderByAggregateInput = {
    id?: SortOrder
    guardian_id?: SortOrder
    driver_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ChildrenListRelationFilter = {
    every?: childrenWhereInput
    some?: childrenWhereInput
    none?: childrenWhereInput
  }

  export type TripsListRelationFilter = {
    every?: tripsWhereInput
    some?: tripsWhereInput
    none?: tripsWhereInput
  }

  export type childrenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tripsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type driversCountOrderByAggregateInput = {
    id?: SortOrder
    driver_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    driver_license?: SortOrder
  }

  export type driversAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type driversMaxOrderByAggregateInput = {
    id?: SortOrder
    driver_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    driver_license?: SortOrder
  }

  export type driversMinOrderByAggregateInput = {
    id?: SortOrder
    driver_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
    driver_license?: SortOrder
  }

  export type driversSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type guardiansCountOrderByAggregateInput = {
    id?: SortOrder
    guardian_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type guardiansAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type guardiansMaxOrderByAggregateInput = {
    id?: SortOrder
    guardian_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type guardiansMinOrderByAggregateInput = {
    id?: SortOrder
    guardian_name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type guardiansSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type tripsCountOrderByAggregateInput = {
    id?: SortOrder
    driver_id?: SortOrder
    children_ids?: SortOrder
    departure_time?: SortOrder
    arrival_time?: SortOrder
    trip_date?: SortOrder
  }

  export type tripsAvgOrderByAggregateInput = {
    id?: SortOrder
    driver_id?: SortOrder
    children_ids?: SortOrder
  }

  export type tripsMaxOrderByAggregateInput = {
    id?: SortOrder
    driver_id?: SortOrder
    departure_time?: SortOrder
    arrival_time?: SortOrder
    trip_date?: SortOrder
  }

  export type tripsMinOrderByAggregateInput = {
    id?: SortOrder
    driver_id?: SortOrder
    departure_time?: SortOrder
    arrival_time?: SortOrder
    trip_date?: SortOrder
  }

  export type tripsSumOrderByAggregateInput = {
    id?: SortOrder
    driver_id?: SortOrder
    children_ids?: SortOrder
  }

  export type driversCreateNestedOneWithoutChildrenInput = {
    create?: XOR<driversCreateWithoutChildrenInput, driversUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: driversCreateOrConnectWithoutChildrenInput
    connect?: driversWhereUniqueInput
  }

  export type guardiansCreateNestedOneWithoutChildrenInput = {
    create?: XOR<guardiansCreateWithoutChildrenInput, guardiansUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: guardiansCreateOrConnectWithoutChildrenInput
    connect?: guardiansWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type driversUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<driversCreateWithoutChildrenInput, driversUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: driversCreateOrConnectWithoutChildrenInput
    upsert?: driversUpsertWithoutChildrenInput
    disconnect?: driversWhereInput | boolean
    delete?: driversWhereInput | boolean
    connect?: driversWhereUniqueInput
    update?: XOR<XOR<driversUpdateToOneWithWhereWithoutChildrenInput, driversUpdateWithoutChildrenInput>, driversUncheckedUpdateWithoutChildrenInput>
  }

  export type guardiansUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<guardiansCreateWithoutChildrenInput, guardiansUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: guardiansCreateOrConnectWithoutChildrenInput
    upsert?: guardiansUpsertWithoutChildrenInput
    disconnect?: guardiansWhereInput | boolean
    delete?: guardiansWhereInput | boolean
    connect?: guardiansWhereUniqueInput
    update?: XOR<XOR<guardiansUpdateToOneWithWhereWithoutChildrenInput, guardiansUpdateWithoutChildrenInput>, guardiansUncheckedUpdateWithoutChildrenInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type childrenCreateNestedManyWithoutDriversInput = {
    create?: XOR<childrenCreateWithoutDriversInput, childrenUncheckedCreateWithoutDriversInput> | childrenCreateWithoutDriversInput[] | childrenUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutDriversInput | childrenCreateOrConnectWithoutDriversInput[]
    createMany?: childrenCreateManyDriversInputEnvelope
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
  }

  export type tripsCreateNestedManyWithoutDriversInput = {
    create?: XOR<tripsCreateWithoutDriversInput, tripsUncheckedCreateWithoutDriversInput> | tripsCreateWithoutDriversInput[] | tripsUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: tripsCreateOrConnectWithoutDriversInput | tripsCreateOrConnectWithoutDriversInput[]
    createMany?: tripsCreateManyDriversInputEnvelope
    connect?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
  }

  export type childrenUncheckedCreateNestedManyWithoutDriversInput = {
    create?: XOR<childrenCreateWithoutDriversInput, childrenUncheckedCreateWithoutDriversInput> | childrenCreateWithoutDriversInput[] | childrenUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutDriversInput | childrenCreateOrConnectWithoutDriversInput[]
    createMany?: childrenCreateManyDriversInputEnvelope
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
  }

  export type tripsUncheckedCreateNestedManyWithoutDriversInput = {
    create?: XOR<tripsCreateWithoutDriversInput, tripsUncheckedCreateWithoutDriversInput> | tripsCreateWithoutDriversInput[] | tripsUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: tripsCreateOrConnectWithoutDriversInput | tripsCreateOrConnectWithoutDriversInput[]
    createMany?: tripsCreateManyDriversInputEnvelope
    connect?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
  }

  export type childrenUpdateManyWithoutDriversNestedInput = {
    create?: XOR<childrenCreateWithoutDriversInput, childrenUncheckedCreateWithoutDriversInput> | childrenCreateWithoutDriversInput[] | childrenUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutDriversInput | childrenCreateOrConnectWithoutDriversInput[]
    upsert?: childrenUpsertWithWhereUniqueWithoutDriversInput | childrenUpsertWithWhereUniqueWithoutDriversInput[]
    createMany?: childrenCreateManyDriversInputEnvelope
    set?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    disconnect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    delete?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    update?: childrenUpdateWithWhereUniqueWithoutDriversInput | childrenUpdateWithWhereUniqueWithoutDriversInput[]
    updateMany?: childrenUpdateManyWithWhereWithoutDriversInput | childrenUpdateManyWithWhereWithoutDriversInput[]
    deleteMany?: childrenScalarWhereInput | childrenScalarWhereInput[]
  }

  export type tripsUpdateManyWithoutDriversNestedInput = {
    create?: XOR<tripsCreateWithoutDriversInput, tripsUncheckedCreateWithoutDriversInput> | tripsCreateWithoutDriversInput[] | tripsUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: tripsCreateOrConnectWithoutDriversInput | tripsCreateOrConnectWithoutDriversInput[]
    upsert?: tripsUpsertWithWhereUniqueWithoutDriversInput | tripsUpsertWithWhereUniqueWithoutDriversInput[]
    createMany?: tripsCreateManyDriversInputEnvelope
    set?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    disconnect?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    delete?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    connect?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    update?: tripsUpdateWithWhereUniqueWithoutDriversInput | tripsUpdateWithWhereUniqueWithoutDriversInput[]
    updateMany?: tripsUpdateManyWithWhereWithoutDriversInput | tripsUpdateManyWithWhereWithoutDriversInput[]
    deleteMany?: tripsScalarWhereInput | tripsScalarWhereInput[]
  }

  export type childrenUncheckedUpdateManyWithoutDriversNestedInput = {
    create?: XOR<childrenCreateWithoutDriversInput, childrenUncheckedCreateWithoutDriversInput> | childrenCreateWithoutDriversInput[] | childrenUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutDriversInput | childrenCreateOrConnectWithoutDriversInput[]
    upsert?: childrenUpsertWithWhereUniqueWithoutDriversInput | childrenUpsertWithWhereUniqueWithoutDriversInput[]
    createMany?: childrenCreateManyDriversInputEnvelope
    set?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    disconnect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    delete?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    update?: childrenUpdateWithWhereUniqueWithoutDriversInput | childrenUpdateWithWhereUniqueWithoutDriversInput[]
    updateMany?: childrenUpdateManyWithWhereWithoutDriversInput | childrenUpdateManyWithWhereWithoutDriversInput[]
    deleteMany?: childrenScalarWhereInput | childrenScalarWhereInput[]
  }

  export type tripsUncheckedUpdateManyWithoutDriversNestedInput = {
    create?: XOR<tripsCreateWithoutDriversInput, tripsUncheckedCreateWithoutDriversInput> | tripsCreateWithoutDriversInput[] | tripsUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: tripsCreateOrConnectWithoutDriversInput | tripsCreateOrConnectWithoutDriversInput[]
    upsert?: tripsUpsertWithWhereUniqueWithoutDriversInput | tripsUpsertWithWhereUniqueWithoutDriversInput[]
    createMany?: tripsCreateManyDriversInputEnvelope
    set?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    disconnect?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    delete?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    connect?: tripsWhereUniqueInput | tripsWhereUniqueInput[]
    update?: tripsUpdateWithWhereUniqueWithoutDriversInput | tripsUpdateWithWhereUniqueWithoutDriversInput[]
    updateMany?: tripsUpdateManyWithWhereWithoutDriversInput | tripsUpdateManyWithWhereWithoutDriversInput[]
    deleteMany?: tripsScalarWhereInput | tripsScalarWhereInput[]
  }

  export type childrenCreateNestedManyWithoutGuardiansInput = {
    create?: XOR<childrenCreateWithoutGuardiansInput, childrenUncheckedCreateWithoutGuardiansInput> | childrenCreateWithoutGuardiansInput[] | childrenUncheckedCreateWithoutGuardiansInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutGuardiansInput | childrenCreateOrConnectWithoutGuardiansInput[]
    createMany?: childrenCreateManyGuardiansInputEnvelope
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
  }

  export type childrenUncheckedCreateNestedManyWithoutGuardiansInput = {
    create?: XOR<childrenCreateWithoutGuardiansInput, childrenUncheckedCreateWithoutGuardiansInput> | childrenCreateWithoutGuardiansInput[] | childrenUncheckedCreateWithoutGuardiansInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutGuardiansInput | childrenCreateOrConnectWithoutGuardiansInput[]
    createMany?: childrenCreateManyGuardiansInputEnvelope
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
  }

  export type childrenUpdateManyWithoutGuardiansNestedInput = {
    create?: XOR<childrenCreateWithoutGuardiansInput, childrenUncheckedCreateWithoutGuardiansInput> | childrenCreateWithoutGuardiansInput[] | childrenUncheckedCreateWithoutGuardiansInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutGuardiansInput | childrenCreateOrConnectWithoutGuardiansInput[]
    upsert?: childrenUpsertWithWhereUniqueWithoutGuardiansInput | childrenUpsertWithWhereUniqueWithoutGuardiansInput[]
    createMany?: childrenCreateManyGuardiansInputEnvelope
    set?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    disconnect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    delete?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    update?: childrenUpdateWithWhereUniqueWithoutGuardiansInput | childrenUpdateWithWhereUniqueWithoutGuardiansInput[]
    updateMany?: childrenUpdateManyWithWhereWithoutGuardiansInput | childrenUpdateManyWithWhereWithoutGuardiansInput[]
    deleteMany?: childrenScalarWhereInput | childrenScalarWhereInput[]
  }

  export type childrenUncheckedUpdateManyWithoutGuardiansNestedInput = {
    create?: XOR<childrenCreateWithoutGuardiansInput, childrenUncheckedCreateWithoutGuardiansInput> | childrenCreateWithoutGuardiansInput[] | childrenUncheckedCreateWithoutGuardiansInput[]
    connectOrCreate?: childrenCreateOrConnectWithoutGuardiansInput | childrenCreateOrConnectWithoutGuardiansInput[]
    upsert?: childrenUpsertWithWhereUniqueWithoutGuardiansInput | childrenUpsertWithWhereUniqueWithoutGuardiansInput[]
    createMany?: childrenCreateManyGuardiansInputEnvelope
    set?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    disconnect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    delete?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    connect?: childrenWhereUniqueInput | childrenWhereUniqueInput[]
    update?: childrenUpdateWithWhereUniqueWithoutGuardiansInput | childrenUpdateWithWhereUniqueWithoutGuardiansInput[]
    updateMany?: childrenUpdateManyWithWhereWithoutGuardiansInput | childrenUpdateManyWithWhereWithoutGuardiansInput[]
    deleteMany?: childrenScalarWhereInput | childrenScalarWhereInput[]
  }

  export type tripsCreatechildren_idsInput = {
    set: number[]
  }

  export type driversCreateNestedOneWithoutTripsInput = {
    create?: XOR<driversCreateWithoutTripsInput, driversUncheckedCreateWithoutTripsInput>
    connectOrCreate?: driversCreateOrConnectWithoutTripsInput
    connect?: driversWhereUniqueInput
  }

  export type tripsUpdatechildren_idsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type driversUpdateOneWithoutTripsNestedInput = {
    create?: XOR<driversCreateWithoutTripsInput, driversUncheckedCreateWithoutTripsInput>
    connectOrCreate?: driversCreateOrConnectWithoutTripsInput
    upsert?: driversUpsertWithoutTripsInput
    disconnect?: driversWhereInput | boolean
    delete?: driversWhereInput | boolean
    connect?: driversWhereUniqueInput
    update?: XOR<XOR<driversUpdateToOneWithWhereWithoutTripsInput, driversUpdateWithoutTripsInput>, driversUncheckedUpdateWithoutTripsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type driversCreateWithoutChildrenInput = {
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
    trips?: tripsCreateNestedManyWithoutDriversInput
  }

  export type driversUncheckedCreateWithoutChildrenInput = {
    id?: number
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
    trips?: tripsUncheckedCreateNestedManyWithoutDriversInput
  }

  export type driversCreateOrConnectWithoutChildrenInput = {
    where: driversWhereUniqueInput
    create: XOR<driversCreateWithoutChildrenInput, driversUncheckedCreateWithoutChildrenInput>
  }

  export type guardiansCreateWithoutChildrenInput = {
    guardian_name: string
    phone: string
    email: string
    password: string
  }

  export type guardiansUncheckedCreateWithoutChildrenInput = {
    id?: number
    guardian_name: string
    phone: string
    email: string
    password: string
  }

  export type guardiansCreateOrConnectWithoutChildrenInput = {
    where: guardiansWhereUniqueInput
    create: XOR<guardiansCreateWithoutChildrenInput, guardiansUncheckedCreateWithoutChildrenInput>
  }

  export type driversUpsertWithoutChildrenInput = {
    update: XOR<driversUpdateWithoutChildrenInput, driversUncheckedUpdateWithoutChildrenInput>
    create: XOR<driversCreateWithoutChildrenInput, driversUncheckedCreateWithoutChildrenInput>
    where?: driversWhereInput
  }

  export type driversUpdateToOneWithWhereWithoutChildrenInput = {
    where?: driversWhereInput
    data: XOR<driversUpdateWithoutChildrenInput, driversUncheckedUpdateWithoutChildrenInput>
  }

  export type driversUpdateWithoutChildrenInput = {
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
    trips?: tripsUpdateManyWithoutDriversNestedInput
  }

  export type driversUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
    trips?: tripsUncheckedUpdateManyWithoutDriversNestedInput
  }

  export type guardiansUpsertWithoutChildrenInput = {
    update: XOR<guardiansUpdateWithoutChildrenInput, guardiansUncheckedUpdateWithoutChildrenInput>
    create: XOR<guardiansCreateWithoutChildrenInput, guardiansUncheckedCreateWithoutChildrenInput>
    where?: guardiansWhereInput
  }

  export type guardiansUpdateToOneWithWhereWithoutChildrenInput = {
    where?: guardiansWhereInput
    data: XOR<guardiansUpdateWithoutChildrenInput, guardiansUncheckedUpdateWithoutChildrenInput>
  }

  export type guardiansUpdateWithoutChildrenInput = {
    guardian_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type guardiansUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    guardian_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type childrenCreateWithoutDriversInput = {
    child_name: string
    starting_point: string
    destination: string
    birth_date?: Date | string | null
    school?: string | null
    guardians?: guardiansCreateNestedOneWithoutChildrenInput
  }

  export type childrenUncheckedCreateWithoutDriversInput = {
    id?: number
    child_name: string
    starting_point: string
    destination: string
    guardian_id?: number | null
    birth_date?: Date | string | null
    school?: string | null
  }

  export type childrenCreateOrConnectWithoutDriversInput = {
    where: childrenWhereUniqueInput
    create: XOR<childrenCreateWithoutDriversInput, childrenUncheckedCreateWithoutDriversInput>
  }

  export type childrenCreateManyDriversInputEnvelope = {
    data: childrenCreateManyDriversInput | childrenCreateManyDriversInput[]
    skipDuplicates?: boolean
  }

  export type tripsCreateWithoutDriversInput = {
    children_ids?: tripsCreatechildren_idsInput | number[]
    departure_time?: Date | string | null
    arrival_time?: Date | string | null
    trip_date?: Date | string | null
  }

  export type tripsUncheckedCreateWithoutDriversInput = {
    id?: number
    children_ids?: tripsCreatechildren_idsInput | number[]
    departure_time?: Date | string | null
    arrival_time?: Date | string | null
    trip_date?: Date | string | null
  }

  export type tripsCreateOrConnectWithoutDriversInput = {
    where: tripsWhereUniqueInput
    create: XOR<tripsCreateWithoutDriversInput, tripsUncheckedCreateWithoutDriversInput>
  }

  export type tripsCreateManyDriversInputEnvelope = {
    data: tripsCreateManyDriversInput | tripsCreateManyDriversInput[]
    skipDuplicates?: boolean
  }

  export type childrenUpsertWithWhereUniqueWithoutDriversInput = {
    where: childrenWhereUniqueInput
    update: XOR<childrenUpdateWithoutDriversInput, childrenUncheckedUpdateWithoutDriversInput>
    create: XOR<childrenCreateWithoutDriversInput, childrenUncheckedCreateWithoutDriversInput>
  }

  export type childrenUpdateWithWhereUniqueWithoutDriversInput = {
    where: childrenWhereUniqueInput
    data: XOR<childrenUpdateWithoutDriversInput, childrenUncheckedUpdateWithoutDriversInput>
  }

  export type childrenUpdateManyWithWhereWithoutDriversInput = {
    where: childrenScalarWhereInput
    data: XOR<childrenUpdateManyMutationInput, childrenUncheckedUpdateManyWithoutDriversInput>
  }

  export type childrenScalarWhereInput = {
    AND?: childrenScalarWhereInput | childrenScalarWhereInput[]
    OR?: childrenScalarWhereInput[]
    NOT?: childrenScalarWhereInput | childrenScalarWhereInput[]
    id?: IntFilter<"children"> | number
    child_name?: StringFilter<"children"> | string
    starting_point?: StringFilter<"children"> | string
    destination?: StringFilter<"children"> | string
    guardian_id?: IntNullableFilter<"children"> | number | null
    driver_id?: IntNullableFilter<"children"> | number | null
    birth_date?: DateTimeNullableFilter<"children"> | Date | string | null
    school?: StringNullableFilter<"children"> | string | null
  }

  export type tripsUpsertWithWhereUniqueWithoutDriversInput = {
    where: tripsWhereUniqueInput
    update: XOR<tripsUpdateWithoutDriversInput, tripsUncheckedUpdateWithoutDriversInput>
    create: XOR<tripsCreateWithoutDriversInput, tripsUncheckedCreateWithoutDriversInput>
  }

  export type tripsUpdateWithWhereUniqueWithoutDriversInput = {
    where: tripsWhereUniqueInput
    data: XOR<tripsUpdateWithoutDriversInput, tripsUncheckedUpdateWithoutDriversInput>
  }

  export type tripsUpdateManyWithWhereWithoutDriversInput = {
    where: tripsScalarWhereInput
    data: XOR<tripsUpdateManyMutationInput, tripsUncheckedUpdateManyWithoutDriversInput>
  }

  export type tripsScalarWhereInput = {
    AND?: tripsScalarWhereInput | tripsScalarWhereInput[]
    OR?: tripsScalarWhereInput[]
    NOT?: tripsScalarWhereInput | tripsScalarWhereInput[]
    id?: IntFilter<"trips"> | number
    driver_id?: IntNullableFilter<"trips"> | number | null
    children_ids?: IntNullableListFilter<"trips">
    departure_time?: DateTimeNullableFilter<"trips"> | Date | string | null
    arrival_time?: DateTimeNullableFilter<"trips"> | Date | string | null
    trip_date?: DateTimeNullableFilter<"trips"> | Date | string | null
  }

  export type childrenCreateWithoutGuardiansInput = {
    child_name: string
    starting_point: string
    destination: string
    birth_date?: Date | string | null
    school?: string | null
    drivers?: driversCreateNestedOneWithoutChildrenInput
  }

  export type childrenUncheckedCreateWithoutGuardiansInput = {
    id?: number
    child_name: string
    starting_point: string
    destination: string
    driver_id?: number | null
    birth_date?: Date | string | null
    school?: string | null
  }

  export type childrenCreateOrConnectWithoutGuardiansInput = {
    where: childrenWhereUniqueInput
    create: XOR<childrenCreateWithoutGuardiansInput, childrenUncheckedCreateWithoutGuardiansInput>
  }

  export type childrenCreateManyGuardiansInputEnvelope = {
    data: childrenCreateManyGuardiansInput | childrenCreateManyGuardiansInput[]
    skipDuplicates?: boolean
  }

  export type childrenUpsertWithWhereUniqueWithoutGuardiansInput = {
    where: childrenWhereUniqueInput
    update: XOR<childrenUpdateWithoutGuardiansInput, childrenUncheckedUpdateWithoutGuardiansInput>
    create: XOR<childrenCreateWithoutGuardiansInput, childrenUncheckedCreateWithoutGuardiansInput>
  }

  export type childrenUpdateWithWhereUniqueWithoutGuardiansInput = {
    where: childrenWhereUniqueInput
    data: XOR<childrenUpdateWithoutGuardiansInput, childrenUncheckedUpdateWithoutGuardiansInput>
  }

  export type childrenUpdateManyWithWhereWithoutGuardiansInput = {
    where: childrenScalarWhereInput
    data: XOR<childrenUpdateManyMutationInput, childrenUncheckedUpdateManyWithoutGuardiansInput>
  }

  export type driversCreateWithoutTripsInput = {
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
    children?: childrenCreateNestedManyWithoutDriversInput
  }

  export type driversUncheckedCreateWithoutTripsInput = {
    id?: number
    driver_name: string
    phone: string
    email: string
    password: string
    driver_license: string
    children?: childrenUncheckedCreateNestedManyWithoutDriversInput
  }

  export type driversCreateOrConnectWithoutTripsInput = {
    where: driversWhereUniqueInput
    create: XOR<driversCreateWithoutTripsInput, driversUncheckedCreateWithoutTripsInput>
  }

  export type driversUpsertWithoutTripsInput = {
    update: XOR<driversUpdateWithoutTripsInput, driversUncheckedUpdateWithoutTripsInput>
    create: XOR<driversCreateWithoutTripsInput, driversUncheckedCreateWithoutTripsInput>
    where?: driversWhereInput
  }

  export type driversUpdateToOneWithWhereWithoutTripsInput = {
    where?: driversWhereInput
    data: XOR<driversUpdateWithoutTripsInput, driversUncheckedUpdateWithoutTripsInput>
  }

  export type driversUpdateWithoutTripsInput = {
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
    children?: childrenUpdateManyWithoutDriversNestedInput
  }

  export type driversUncheckedUpdateWithoutTripsInput = {
    id?: IntFieldUpdateOperationsInput | number
    driver_name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    driver_license?: StringFieldUpdateOperationsInput | string
    children?: childrenUncheckedUpdateManyWithoutDriversNestedInput
  }

  export type childrenCreateManyDriversInput = {
    id?: number
    child_name: string
    starting_point: string
    destination: string
    guardian_id?: number | null
    birth_date?: Date | string | null
    school?: string | null
  }

  export type tripsCreateManyDriversInput = {
    id?: number
    children_ids?: tripsCreatechildren_idsInput | number[]
    departure_time?: Date | string | null
    arrival_time?: Date | string | null
    trip_date?: Date | string | null
  }

  export type childrenUpdateWithoutDriversInput = {
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    guardians?: guardiansUpdateOneWithoutChildrenNestedInput
  }

  export type childrenUncheckedUpdateWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    guardian_id?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type childrenUncheckedUpdateManyWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    guardian_id?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tripsUpdateWithoutDriversInput = {
    children_ids?: tripsUpdatechildren_idsInput | number[]
    departure_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    arrival_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tripsUncheckedUpdateWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number
    children_ids?: tripsUpdatechildren_idsInput | number[]
    departure_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    arrival_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tripsUncheckedUpdateManyWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number
    children_ids?: tripsUpdatechildren_idsInput | number[]
    departure_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    arrival_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trip_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type childrenCreateManyGuardiansInput = {
    id?: number
    child_name: string
    starting_point: string
    destination: string
    driver_id?: number | null
    birth_date?: Date | string | null
    school?: string | null
  }

  export type childrenUpdateWithoutGuardiansInput = {
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    drivers?: driversUpdateOneWithoutChildrenNestedInput
  }

  export type childrenUncheckedUpdateWithoutGuardiansInput = {
    id?: IntFieldUpdateOperationsInput | number
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type childrenUncheckedUpdateManyWithoutGuardiansInput = {
    id?: IntFieldUpdateOperationsInput | number
    child_name?: StringFieldUpdateOperationsInput | string
    starting_point?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    birth_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}