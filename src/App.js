import { Console, MissionUtils } from "@woowacourse/mission-utils";
import {
  validateDuplicateNumbers,
  validateEmptyInput,
  validateLottoNumberRange,
  validatePositiveNumber,
  validateThousandUnit,
} from "./validate.js";
import { BONUS_PRIZE_INDEX, PRICE_UNIT, winningInfo } from "./const.js";

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

const calcWinningResult = (lottoNumbersArr, winningNumbers, bonusNumber) => {
  const result = [...winningInfo];
  lottoNumbersArr.forEach((lottoNumbers) => {
    const matchCount = lottoNumbers.filter((num) =>
      winningNumbers.includes(num)
    ).length;
    const hasBonusNumber = lottoNumbers.includes(bonusNumber);

    if (matchCount < 3) {
      return;
    }

    if (hasBonusNumber && matchCount === 5) {
      result[BONUS_PRIZE_INDEX].count += 1;
      return;
    }
    const prizeInfo = result.find((item) => item.match === matchCount);
    prizeInfo.count += 1;
  });

  return result;
};

const printWinningResult = (result) => {
  result.forEach((item, index) => {
    const formattedPrice = item.prizeMoney.toLocaleString();
    if (index === BONUS_PRIZE_INDEX) {
      Console.print(
        `${item.match}개 일치, 보너스 볼 일치 (${formattedPrice}원) - ${item.count}개`
      );
    } else {
      Console.print(
        `${item.match}개 일치 (${formattedPrice}원) - ${item.count}개`
      );
    }
  });
};

const calcTotalYield = (result, purchasePrice) => {
  let totalPrice = 0;
  result.forEach((item) => {
    totalPrice += item.count * item.prizeMoney;
  });
  const totalYield = (totalPrice / purchasePrice) * 100;
  return totalYield.toFixed(1);
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

    const result = calcWinningResult(
      lottoNumbersArr,
      winningNumbers,
      bonusNumber
    );

    printWinningResult(result);
    const totalYield = calcTotalYield(result, purchasePrice);

    Console.print(`총 수익률은 ${totalYield}%입니다.`);
  }
}

export default App;
