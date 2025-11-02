import { Console, MissionUtils } from "@woowacourse/mission-utils";
import {
  validateDuplicateNumbers,
  validateEmptyInput,
  validateLottoNumberRange,
  validatePositiveNumber,
  validateThousandUnit,
} from "./validate.js";
import { PRICE_UNIT, winningPrices } from "./const.js";

const inputPurchasePrice = async () => {
  const rawInput = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
  const trimmed = rawInput.trim();
  validateEmptyInput(trimmed, "구입금액");
  const numberInput = validatePositiveNumber(trimmed, "구입금액");
  validateThousandUnit(numberInput);
  return numberInput;
};

const calcPurchaseCount = (price) => {
  const purchaseNum = Number(price) / PRICE_UNIT;
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

const inputWinningNumbers = async () => {
  const rawInput = await Console.readLineAsync(
    "\n당첨 번호를 입력해 주세요.\n"
  );
  const trimmed = rawInput.trim();
  const splitArray = trimmed.split(",");
  if (splitArray.length !== 6) {
    throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
  }
  const numberArray = splitArray.map((input) => {
    validateEmptyInput(input, "당첨 번호");
    const numberInput = validatePositiveNumber(input, "당첨 번호");
    validateLottoNumberRange(numberInput);

    return numberInput;
  });
  validateDuplicateNumbers(numberArray, "당첨 번호");

  return numberArray;
};

const inputBonusNumber = async (winningNumbers) => {
  const rawInput = await Console.readLineAsync(
    "\n보너스 번호를 입력해 주세요.\n"
  );
  const trimmed = rawInput.trim();
  validateEmptyInput(trimmed, "보너스 번호");
  const numberInput = validatePositiveNumber(trimmed, "보너스 번호");
  validateLottoNumberRange(numberInput);
  validateDuplicateNumbers([...winningNumbers, numberInput], "보너스 번호");

  return numberInput;
};

const getMatchText = (index) => {
  if (index === 7) {
    return "5개 일치, 보너스 볼 일치";
  }
  return `${index}개 일치`;
};

const calcWinningResult = (lottoNumbersArr, winningNumbers, bonusNumber) => {
  const resultMap = new Map();

  lottoNumbersArr.forEach((lottoNumbers) => {
    const matchCount = lottoNumbers.filter((num) =>
      winningNumbers.includes(num)
    ).length;

    if (matchCount < 3) {
      return;
    }

    if (matchCount === 5) {
      const hasBonus = lottoNumbers.includes(bonusNumber);
      const prizeIndex = hasBonus ? 7 : 5;
      const currentCount = resultMap.get(prizeIndex) || 0;
      resultMap.set(prizeIndex, currentCount + 1);
    } else {
      const prizeIndex = matchCount;
      const currentCount = resultMap.get(prizeIndex) || 0;
      resultMap.set(prizeIndex, currentCount + 1);
    }
  });

  const order = [3, 4, 5, 7, 6];

  order.forEach((index) => {
    const count = resultMap.get(index) || 0;
    const price = winningPrices[index];
    const formattedPrice = price.toLocaleString();
    const matchText = getMatchText(index);
    Console.print(`${matchText} (${formattedPrice}원) - ${count}개`);
  });
};

class App {
  async run() {
    const purchasePrice = await inputPurchasePrice();
    const purchaseNum = calcPurchaseCount(purchasePrice);
    Console.print(`\n${purchaseNum}개를 구매했습니다.`);
    const lottoNumbersArr = createLottoNumbers(purchaseNum);
    printLottoNumbersArr(lottoNumbersArr);
    const winningNumbers = await inputWinningNumbers();

    const bonusNumber = await inputBonusNumber(winningNumbers);
    Console.print("\n당첨 통계\n---");
    calcWinningResult(lottoNumbersArr, winningNumbers, bonusNumber);
  }
}

export default App;
