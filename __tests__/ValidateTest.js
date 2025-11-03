import {
  validateEmptyInput,
  validatePositiveNumber,
  validateThousandUnit,
  validateLottoNumberRange,
  validateNumbersLength,
  validateDuplicateNumbers,
} from "../src/validate.js";
import { FIELD_NAMES } from "../src/const.js";

describe("validateEmptyInput 테스트", () => {
  test("빈 문자열이면 예외가 발생한다.", () => {
    expect(() => {
      validateEmptyInput("", FIELD_NAMES.PURCHASE_PRICE);
    }).toThrow("[ERROR]");
  });

  test("null이면 예외가 발생한다.", () => {
    expect(() => {
      validateEmptyInput(null, FIELD_NAMES.PURCHASE_PRICE);
    }).toThrow("[ERROR]");
  });

  test("undefined이면 예외가 발생한다.", () => {
    expect(() => {
      validateEmptyInput(undefined, FIELD_NAMES.PURCHASE_PRICE);
    }).toThrow("[ERROR]");
  });
});

describe("validatePositiveNumber 테스트", () => {
  test("문자열이면 예외가 발생한다.", () => {
    expect(() => {
      validatePositiveNumber("abc", FIELD_NAMES.PURCHASE_PRICE);
    }).toThrow("[ERROR]");
  });

  test("소수이면 예외가 발생한다.", () => {
    expect(() => {
      validatePositiveNumber(1000.5, FIELD_NAMES.PURCHASE_PRICE);
    }).toThrow("[ERROR]");
  });

  test("0이면 예외가 발생한다.", () => {
    expect(() => {
      validatePositiveNumber(0, FIELD_NAMES.PURCHASE_PRICE);
    }).toThrow("[ERROR]");
  });

  test("음수이면 예외가 발생한다.", () => {
    expect(() => {
      validatePositiveNumber(-1000, FIELD_NAMES.PURCHASE_PRICE);
    }).toThrow("[ERROR]");
  });

  test("양의 정수이면 정수를 반환한다.", () => {
    const result = validatePositiveNumber("1000", FIELD_NAMES.PURCHASE_PRICE);
    expect(result).toBe(1000);
  });
});

describe("validateThousandUnit 테스트", () => {
  test("1000으로 나누어떨어지지 않으면 예외가 발생한다.", () => {
    expect(() => {
      validateThousandUnit(1500);
    }).toThrow(`[ERROR]`);
  });

  test("1000단위이면 예외가 발생하지 않는다.", () => {
    expect(() => {
      validateThousandUnit(1000);
    }).not.toThrow();
  });
});

describe("validateLottoNumberRange 테스트", () => {
  test("1보다 작으면 예외가 발생한다.", () => {
    expect(() => {
      validateLottoNumberRange(0, FIELD_NAMES.LOTTO_NUMBERS);
    }).toThrow("[ERROR]");
  });

  test("45보다 크면 예외가 발생한다.", () => {
    expect(() => {
      validateLottoNumberRange(46, FIELD_NAMES.LOTTO_NUMBERS);
    }).toThrow("[ERROR]");
  });

  test("1~45 사이의 숫자이면 예외가 발생하지 않는다.", () => {
    expect(() => {
      validateLottoNumberRange(25, FIELD_NAMES.LOTTO_NUMBERS);
    }).not.toThrow();
  });
});

describe("validateNumbersLength 테스트", () => {
  test("6개가 아니면 예외가 발생한다.", () => {
    expect(() => {
      validateNumbersLength([1, 2, 3, 4, 5], FIELD_NAMES.LOTTO_NUMBERS);
    }).toThrow("[ERROR]");
  });

  test("6개보다 많으면 예외가 발생한다.", () => {
    expect(() => {
      validateNumbersLength([1, 2, 3, 4, 5, 6, 7], FIELD_NAMES.LOTTO_NUMBERS);
    }).toThrow("[ERROR]");
  });

  test("6개이면 예외가 발생하지 않는다.", () => {
    expect(() => {
      validateNumbersLength([1, 2, 3, 4, 5, 6], FIELD_NAMES.LOTTO_NUMBERS);
    }).not.toThrow();
  });
});

describe("validateDuplicateNumbers 테스트", () => {
  test("중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      validateDuplicateNumbers([1, 2, 3, 4, 5, 5], FIELD_NAMES.LOTTO_NUMBERS);
    }).toThrow("[ERROR]");
  });

  test("중복된 숫자가 여러 개 있으면 예외가 발생한다.", () => {
    expect(() => {
      validateDuplicateNumbers([1, 1, 2, 2, 3, 3], FIELD_NAMES.LOTTO_NUMBERS);
    }).toThrow("[ERROR]");
  });

  test("중복된 숫자가 없으면 예외가 발생하지 않는다.", () => {
    expect(() => {
      validateDuplicateNumbers([1, 2, 3, 4, 5, 6], FIELD_NAMES.LOTTO_NUMBERS);
    }).not.toThrow();
  });

  test("모든 숫자가 중복되지 않으면 예외가 발생하지 않는다.", () => {
    expect(() => {
      validateDuplicateNumbers(
        [1, 15, 25, 35, 40, 45],
        FIELD_NAMES.LOTTO_NUMBERS
      );
    }).not.toThrow();
  });
});
