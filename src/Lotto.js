import {
  validateDuplicateNumbers,
  validateEmptyInput,
  validateLottoNumberRange,
  validateNumbersLength,
  validatePositiveNumber,
} from "./validate.js";

class Lotto {
  #numbers; // 로또 번호

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    const validateField = "로또 번호";
    validateNumbersLength(numbers, validateField);
    validateDuplicateNumbers(numbers, validateField);
    numbers.forEach((num) => {
      validateEmptyInput(num, validateField);
      validatePositiveNumber(num, validateField);
      validateLottoNumberRange(num, validateField);
    });
  }

  get numbers() {
    return this.#numbers;
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  getHasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
