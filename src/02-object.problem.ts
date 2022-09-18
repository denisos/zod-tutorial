// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const PersonParser = z.object({
  name: z.string(),
  eye_color: z.string()
});

type Person = z.infer<typeof PersonParser>;

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch("https://swapi.dev/api/people/" + id).then((res) =>
    res.json(),
  );

  // will reduce api response down to the set of keys in parser
  const parsedData: Person = PersonParser.parse(data);
  console.log(parsedData)
  return parsedData.name;
};

// TESTS

it("Should return the name", async () => {
  expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
  expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});
