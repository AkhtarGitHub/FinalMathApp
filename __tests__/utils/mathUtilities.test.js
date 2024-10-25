const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  it("should return a valid question object", () => {
    const question = getQuestion();
    expect(typeof question.question).toBe("string");
    expect(typeof question.answer).toBe("number");
  });
});

describe("Tests for isCorrectAnswer", () => {
  it("should return true for correct answer", () => {
    expect(isCorrectAnswer("2 + 2", 4)).toBe(true);
  });

  it("should return false for incorrect answer", () => {
    expect(isCorrectAnswer("2 + 2", 5)).toBe(false);
  });
});
