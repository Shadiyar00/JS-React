import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { queryResources } from "../src/api/query.js";
const items = JSON.parse(
  fs.readFileSync(new URL("../src/data/resources.json", import.meta.url)),
);
test("seed has 120 unique records", () => {
  assert.equal(items.length, 120);
  assert.equal(new Set(items.map((x) => x.id)).size, 120);
});
test("combined search and filters", () => {
  const r = queryResources(items, {
    search: "state",
    topic: "React",
    level: "Beginner",
  });
  assert.equal(r.total, 1);
  assert.equal(r.items[0].title, "React: State and events");
});
test("duration sorting does not mutate the source", () => {
  const before = JSON.stringify(items);
  const r = queryResources(items, { sort: "duration" });
  assert.ok(
    r.items.every((x, i, a) => i === 0 || a[i - 1].minutes <= x.minutes),
  );
  assert.equal(JSON.stringify(items), before);
});
test("pagination clamps invalid pages and handles empty results", () => {
  const r = queryResources(items, { page: 999 });
  assert.equal(r.page, 14);
  assert.equal(r.items.length, 3);
  const empty = queryResources(items, { search: "no-such-resource" });
  assert.equal(empty.total, 0);
  assert.equal(empty.page, 1);
  assert.deepEqual(empty.items, []);
});
