import { PURCHASE_UNIT } from "../const.js";

export const validateEmptyInput = (input, field) => {
  if (!input || input === "") {
    throw new Error(`${field}의 값이 존재하지 않습니다.`);
  }
};

export const validatePositiveNumber = (input, field) => {
  const numInput = Number(input);

  if (Number.isNaN(numInput)) {
    throw new Error(`${field}는 숫자여야 합니다.`);
  }
  if (!Number.isInteger(numInput)) {
    throw new Error(`${field}는 정수여야 합니다.`);
  }
  if (numInput <= 0) {
    throw new Error(`${field}는 1이상의 양의 정수여야 합니다.`);
  }
  return numInput;
};

export const validateThousandUnit = (input) => {
  if (Number(input) % PURCHASE_UNIT !== 0) {
    throw new Error(
      `구입 금액의 입력값은 ${PURCHASE_UNIT}단위 숫자로 입력해 주세요.`
    );
  }
};

export const validateLottoNumberRange = (input, field) => {
  const numInput = Number(input);
  const isLottoNumberRange = numInput >= 1 && numInput <= 45;
  if (!isLottoNumberRange) {
    throw new Error(`${field}는 1 ~ 45 이내의 숫자여야 합니다.`);
  }
};

export const validateNumbersLength = (numbers, field) => {
  if (numbers.length !== 6) {
    throw new Error(`${field}는 6개여야 합니다.`);
  }
};

export const validateDuplicateNumbers = (numbers, field) => {
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== numbers.length) {
    throw new Error(`${field}에 중복된 숫자가 있습니다.`);
  }
};
