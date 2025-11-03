import { Console, MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import {
  validateDuplicateNumbers,
  validateEmptyInput,
  validateLottoNumberRange,
  validatePositiveNumber,
  validateThousandUnit,
} from "./utils/validate.js";
import {
  BONUS_PRIZE_INDEX,
  FIELD_NAMES,
  PURCHASE_UNIT,
  winningInfo,
} from "./const.js";
import { parseInput } from "./utils/parse.js";

const inputPurchasePrice = async () => {
  const input = await parseInput(FIELD_NAMES.PURCHASE_PRICE);
  validateEmptyInput(input, FIELD_NAMES.PURCHASE_PRICE);
  const numberInput = validatePositiveNumber(input, FIELD_NAMES.PURCHASE_PRICE);
  validateThousandUnit(numberInput);

  return numberInput;
};

const calcPurchaseCount = (price) => {
  const purchaseNum = Number(price) / PURCHASE_UNIT;
  return purchaseNum;
};

const createLottoNumbers = (purchaseNum) => {
  const lottoArray = [];

  for (let i = 1; i <= purchaseNum; i++) {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    const sortedLottoNumbers = lottoNumbers.sort(
      (first, second) => first - second
    );
    lottoArray.push(new Lotto(sortedLottoNumbers));
  }

  return lottoArray;
};

const printLottoArray = (lottoArray) => {
  lottoArray.forEach((numbers) => {
    Console.print(numbers);
  });
};

const inputWinningNumbers = async () => {
  const input = parseInput(FIELD_NAMES.WINNING_NUMBERS);
  const splitArray = input.split(",");

  const numberArray = splitArray.map((input) => {
    validateEmptyInput(input, FIELD_NAMES.WINNING_NUMBERS);
    const numberInput = validatePositiveNumber(
      input,
      FIELD_NAMES.WINNING_NUMBERS
    );
    validateLottoNumberRange(numberInput);

    return numberInput;
  });

  validateDuplicateNumbers(numberArray, FIELD_NAMES.WINNING_NUMBERS);

  return numberArray;
};

/**
 * @description 보너스 번호 입력 기능
 */
const inputBonusNumber = async (winningNumbers) => {
  const input = parseInput(FIELD_NAMES.BONUS_NUMBERS);
  validateEmptyInput(input, FIELD_NAMES.BONUS_NUMBERS);
  const numberInput = validatePositiveNumber(input, FIELD_NAMES.BONUS_NUMBERS);
  validateLottoNumberRange(numberInput);
  validateDuplicateNumbers(
    [...winningNumbers, numberInput],
    FIELD_NAMES.BONUS_NUMBERS
  );

  return numberInput;
};

const incrementCount = (result, matchCount, hasBonus) => {
  if (matchCount < 3) {
    return;
  }

  if (matchCount === 5 && hasBonus) {
    result[PURCHASE_UNIT].count += 1;
  }

  const target = result.find((item) => item.match === matchCount);
  if (!target) target.count += 1;
};

const calcWinningResult = (lottoArray, winningNumbers, bonusNumber) => {
  const result = structuredClone(winningInfo);

  lottoArray.forEach((lotto) => {
    const matchCount = lotto.getMatchCount(winningNumbers);
    const hasBonus = lotto.getHasBonus(bonusNumber);

    incrementCount(result, matchCount, hasBonus);
  });

  return result;
};

const setWinningResultMessage = (item, index) => {
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
};

const printWinningResult = (result) => {
  result.forEach((item, index) => {
    setWinningResultMessage(item, index);
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

export const startLottoMachine = async () => {
  const purchasePrice = await inputPurchasePrice();
  const purchaseCount = calcPurchaseCount(purchasePrice);
  Console.print(`\n${purchaseCount}개를 구매했습니다.`);
  const lottoArray = createLottoNumbers(purchaseCount);
  printLottoArray(lottoArray);
  const winningNumbers = await inputWinningNumbers();
  const bonusNumber = await inputBonusNumber(winningNumbers);
  Console.print("\n당첨 통계\n---");
  const result = calcWinningResult(lottoArray, winningNumbers, bonusNumber);
  printWinningResult(result);
  const totalYield = calcTotalYield(result, purchasePrice);
  Console.print(`총 수익률은 ${totalYield}%입니다.`);
};
