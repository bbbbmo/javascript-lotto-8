import { PRICE_UNIT } from "./const.js";

export const validateEmptyInput = (input, field) => {
  if (!input || input === "") {
    throw new Error(`[ERROR] ${field}의 입력값이 존재하지 않습니다.`);
  }
};

export const validatePositiveNumber = (input, field) => {
  const numInput = Number(input);

  if (Number.isNaN(numInput)) {
    throw new Error(`[ERROR] ${field}의 입력값은 숫자를 입력해 주세요.`);
  }
  if (!Number.isInteger(numInput)) {
    throw new Error(`[ERROR] ${field}의 입력값은 정수로 입력해 주세요.`);
  }
  if (numInput <= 0) {
    throw new Error(
      `[ERROR] ${field}의 입력값은 1 이상의 정수로 입력해 주세요.`
    );
  }
  return numInput;
};

export const validateThousandUnit = (input) => {
  if (Number(input) % PRICE_UNIT !== 0) {
    throw new Error(
      `[ERROR] 구입 금액의 입력값은 ${PRICE_UNIT}단위 숫자로 입력해 주세요.`
    );
  }
};

export const validateLottoNumberRange = (input) => {
  const numInput = Number(input);
  const isLottoNumberRange = numInput >= 1 && numInput <= 45;
  if (!isLottoNumberRange) {
    throw new Error(
      "[ERROR] 당첨 번호의 입력값은 1 ~ 45 이내의 숫자를 입력해 주세요."
    );
  }
};

export const validateDuplicateNumbers = (numbers, field) => {
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== numbers.length) {
    throw new Error(`[ERROR] ${field}에 중복된 숫자가 있습니다.`);
  }
};
