/*
 * Motivation: Catch some of the most common bug-types at build time
 *  1. `null` or `undefined`
 *  2. Thymeleaf-related
 *  3. Forgot something on refactoring
 */


// -----------Basic types --------------------

let first = 14;

let another = "Hello XP";

first = another;

// ----------- Objects w/ interfaces ----------

let content: Content = {
  _id: "b2b0a76d-59b0-4d87-8a47-bfbd315eb551",
  isValid: true,
  data: {
    title: "My awesome content",
    body: "This is going to be awesome!!!"
  }
}

interface Content {
  _id: string;
  valid: boolean;
  data: {
    title: string;
    body?: string;
  }
}

const body: string = content.data.body;
