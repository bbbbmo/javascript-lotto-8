import { Console } from "@woowacourse/mission-utils";

const inputPurchasePrice = async () => {
  const rawInput = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
  validateEmptyInput(rawInput, "구입금액");
  validatePositiveNumber(rawInput, "구입금액");
  validateThousandUnit(rawInput);
};

const validateEmptyInput = (input, field) => {
  if (!input || input === "") {
    throw new Error(`[ERROR] ${field}의 입력값이 존재하지 않습니다.`);
  }
};

const validatePositiveNumber = (input, field) => {
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

const validateThousandUnit = (input) => {
  if (Number(input) % 1000 !== 0) {
    throw new Error(
      "[ERROR] 구입 금액의 입력값은 1000단위 숫자로 입력해주세요."
    );
  }
};

class App {
  async run() {
    await inputPurchasePrice();
  }
}

export default App;
