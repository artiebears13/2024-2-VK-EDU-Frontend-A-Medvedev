import correctSentence from './correctSentence';

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.")
})

test('test border cases', () => {
  expect(correctSentence("")).toBe("")
  expect(correctSentence(undefined)).toBe("")
  expect(correctSentence(".")).toBe(".")
})
