import { Console, MissionUtils } from "@woowacourse/mission-utils";
import {
  validateEmptyInput,
  validatePositiveNumber,
  validateThousandUnit,
} from "./validate.js";

const PURCHASE_UNIT = 1000;

const inputPurchasePrice = async () => {
  const rawInput = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
  validateEmptyInput(rawInput, "구입금액");
  const numberInput = validatePositiveNumber(rawInput, "구입금액");
  validateThousandUnit(numberInput);
  return numberInput;
};

const calcPurchaseCount = (price) => {
  const purchaseNum = Number(price) / PURCHASE_UNIT;
  return purchaseNum;
};

const createLottoNumbers = (purchaseNum) => {
  const lottoNumbersArr = [];
  for (let i = 1; i <= purchaseNum; i++) {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    const sortedLottoNumbers = lottoNumbers.sort((pre, next) => pre - next);
    lottoNumbersArr.push(sortedLottoNumbers);
  }
  return lottoNumbersArr;
};

const printLottoNumbersArr = (lottoNumbersArr) => {
  lottoNumbersArr.forEach((numbers) => {
    Console.print(numbers);
  });
};

class App {
  async run() {
    const purchasePrice = await inputPurchasePrice();
    const purchaseNum = calcPurchaseCount(purchasePrice);
    Console.print(`\n${purchaseNum}개를 구매했습니다.`);
    const lottoNumbersArr = createLottoNumbers(purchaseNum);
    printLottoNumbersArr(lottoNumbersArr);
  }
}

export default App;
