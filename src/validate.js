export const validateEmptyInput = (input, field) => {
  if (!input || input === "") {
    throw new Error(`[ERROR] ${field}의 입력값이 존재하지 않습니다.`);
  }
};

export const validatePositiveNumber = (input, field) => {
  const numInput = Number(input);

  if (Number.isNaN(numInput)) {
    throw new Error(`[ERROR] ${field}의 입력값은 숫자를 입력해주세요.`);
  }
  if (!Number.isInteger(numInput)) {
    throw new Error(`[ERROR] ${field}의 입력값은 정수로 입력해주세요.`);
  }
  if (numInput <= 0) {
    throw new Error(
      `[ERROR] ${field}의 입력값은 1 이상의 정수로 입력해주세요.`
    );
  }
};

export const validateThousandUnit = (input) => {
  if (Number(input) % 1000 !== 0) {
    throw new Error(
      "[ERROR] 구입 금액의 입력값은 1000단위 숫자로 입력해주세요."
    );
  }
};
