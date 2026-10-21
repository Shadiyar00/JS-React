import initialResources from "../data/resources.json";
import { topics, levels, formats } from "../data/constants.js";
import { queryResources } from "./query.js";
const KEY = "studyshelf.resources.v1";
// Every operation is asynchronous; AbortSignal cancels reads during effect cleanup.
function delay(signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted)
      return reject(new DOMException("Cancelled", "AbortError"));
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException("Cancelled", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, 350);
    signal?.addEventListener("abort", abort, { once: true });
  });
}
function read() {
  const saved = localStorage.getItem(KEY);
  if (!saved) {
    localStorage.setItem(KEY, JSON.stringify(initialResources));
    return initialResources;
  }
  const items = JSON.parse(saved);
  if (
    !Array.isArray(items) ||
    items.some(
      (item) =>
        !item.id ||
        !item.title ||
        !item.createdAt ||
        !Number.isFinite(item.minutes),
    )
  ) {
    throw new Error(
      "Saved catalog is invalid. Restore the sample catalog to continue.",
    );
  }
  return items;
}
export function validateResource(values) {
  const errors = {};
  if (values.title.trim().length < 3 || values.title.trim().length > 120)
    errors.title = "Use 3–120 characters.";
  if (
    values.description.trim().length < 15 ||
    values.description.trim().length > 1000
  )
    errors.description = "Use 15–1000 characters.";
  try {
    const url = new URL(values.url);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    errors.url = "Enter a complete http or https link.";
  }
  if (
    !Number.isInteger(Number(values.minutes)) ||
    Number(values.minutes) < 5 ||
    Number(values.minutes) > 1200
  )
    errors.minutes = "Enter 5–1200 whole minutes.";
  if (!topics.includes(values.topic)) errors.topic = "Select a topic.";
  if (!levels.includes(values.level)) errors.level = "Select a level.";
  if (!formats.includes(values.format)) errors.format = "Select a format.";
  return errors;
}
export const resourcesApi = {
  async list(options, { signal, fail = false } = {}) {
    await delay(signal);
    if (fail)
      throw new Error(
        "Demo request failed. Turn off the error switch and retry.",
      );
    return queryResources(read(), options);
  },
  async detail(id, { signal } = {}) {
    await delay(signal);
    const item = read().find((item) => item.id === id);
    if (!item) throw new Error("This resource was not found.");
    return item;
  },
  async add(values) {
    await delay();
    if (Object.keys(validateResource(values)).length)
      throw new Error("Check the form fields.");
    const item = {
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      url: values.url.trim(),
      minutes: Number(values.minutes),
      id:
        globalThis.crypto?.randomUUID?.() ??
        `resource-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
    };
    const items = read();
    localStorage.setItem(KEY, JSON.stringify([item, ...items]));
    return item;
  },
  async restore() {
    await delay();
    localStorage.setItem(KEY, JSON.stringify(initialResources));
  },
};
