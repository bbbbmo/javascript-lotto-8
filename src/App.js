import { Console } from "@woowacourse/mission-utils";
import {
  validateEmptyInput,
  validatePositiveNumber,
  validateThousandUnit,
} from "./validate";

const inputPurchasePrice = async () => {
  const rawInput = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
  validateEmptyInput(rawInput, "구입금액");
  validatePositiveNumber(rawInput, "구입금액");
  validateThousandUnit(rawInput);
};

class App {
  async run() {
    await inputPurchasePrice();
  }
}

export default App;
