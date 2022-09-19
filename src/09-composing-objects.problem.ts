import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!
 */

// could define id and reuse
const IdSchema = z.string().uuid();

// could define a base to inherit from
const IdBaseSchema = z.object({
  id: IdSchema
});

// const User = z.object({
//   id: IdSchema,
//   name: z.string(),
// });

const User = IdBaseSchema.extend({
  name: z.string(),
});

const Post = z.object({
  id: IdSchema,
  title: z.string(),
  body: z.string(),
});

const Comment = z.object({
  id: IdSchema,
  text: z.string(),
});

type UserType = z.infer<typeof User>

type cases = [
  Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
  Expect<
    Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>
  >,
  Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>,
];
