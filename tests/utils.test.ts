// Import the add function from the appropriate module
import { add } from "../src/utils.ts"

it("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3)
  add(1, 2)
})
