import {
  validatePurchasePrice,
  calcPurchaseCount,
  createLottoNumbers,
  validateWinningNumbers,
  validateBonusNumber,
  incrementCount,
  calcWinningResult,
  calcTotalYield,
} from "../src/lottoMachine.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "../src/Lotto.js";
import { BONUS_PRIZE_INDEX, winningInfo } from "../src/const.js";

describe("validatePurchasePrice 테스트", () => {
  test("정상적인 구매 금액이면 숫자를 반환한다.", () => {
    const result = validatePurchasePrice("1000");
    expect(result).toBe(1000);
  });

  test("공백이 포함된 구매 금액이면 trim 후 검증한다.", () => {
    const result = validatePurchasePrice("  2000  ");
    expect(result).toBe(2000);
  });

  test("빈 문자열이면 예외가 발생한다.", () => {
    expect(() => {
      validatePurchasePrice("");
    }).toThrow("[ERROR]");
  });

  test("공백만 있으면 예외가 발생한다.", () => {
    expect(() => {
      validatePurchasePrice("   ");
    }).toThrow("[ERROR]");
  });

  test("1000단위가 아니면 예외가 발생한다.", () => {
    expect(() => {
      validatePurchasePrice("1500");
    }).toThrow("[ERROR]");
  });

  test("숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      validatePurchasePrice("abc");
    }).toThrow("[ERROR]");
  });

  test("양의 정수가 아니면 예외가 발생한다.", () => {
    expect(() => {
      validatePurchasePrice("-1000");
    }).toThrow("[ERROR]");
  });
});

describe("calcPurchaseCount 테스트", () => {
  test("1000원이면 1개를 반환한다.", () => {
    const result = calcPurchaseCount(1000);
    expect(result).toBe(1);
  });

  test("5000원이면 5개를 반환한다.", () => {
    const result = calcPurchaseCount(5000);
    expect(result).toBe(5);
  });
});

describe("createLottoNumbers 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("구매 개수만큼 로또를 생성한다.", () => {
    const mockNumbers = [1, 2, 3, 4, 5, 6];
    MissionUtils.Random.pickUniqueNumbersInRange = jest
      .fn()
      .mockReturnValue(mockNumbers);

    const result = createLottoNumbers(3);

    expect(result).toHaveLength(3);
    expect(MissionUtils.Random.pickUniqueNumbersInRange).toHaveBeenCalledTimes(
      3
    );
  });

  test("생성된 로또 번호는 정렬되어 있다.", () => {
    const mockNumbers = [6, 1, 5, 2, 4, 3];
    MissionUtils.Random.pickUniqueNumbersInRange = jest
      .fn()
      .mockReturnValue(mockNumbers);

    const result = createLottoNumbers(1);

    expect(result[0].numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("생성된 로또는 Lotto 인스턴스이다.", () => {
    const mockNumbers = [1, 2, 3, 4, 5, 6];
    MissionUtils.Random.pickUniqueNumbersInRange = jest
      .fn()
      .mockReturnValue(mockNumbers);

    const result = createLottoNumbers(1);

    expect(result[0]).toBeInstanceOf(Lotto);
  });
});

describe("validateWinningNumbers 테스트", () => {
  test("정상적인 당첨 번호이면 배열을 반환한다.", () => {
    const result = validateWinningNumbers("1,2,3,4,5,6");
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("공백이 포함된 당첨 번호이면 trim 후 검증한다.", () => {
    const result = validateWinningNumbers(" 1, 2, 3, 4, 5, 6 ");
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("빈 문자열이면 예외가 발생한다.", () => {
    expect(() => {
      validateWinningNumbers("");
    }).toThrow("[ERROR]");
  });

  test("6개가 아니면 예외가 발생한다.", () => {
    expect(() => {
      validateWinningNumbers("1,2,3,4,5");
    }).toThrow("[ERROR]");
  });

  test("중복된 번호가 있으면 예외가 발생한다.", () => {
    expect(() => {
      validateWinningNumbers("1,2,3,4,5,5");
    }).toThrow("[ERROR]");
  });

  test("범위를 벗어난 번호가 있으면 예외가 발생한다.", () => {
    expect(() => {
      validateWinningNumbers("1,2,3,4,5,46");
    }).toThrow("[ERROR]");
  });

  test("숫자가 아닌 값이 있으면 예외가 발생한다.", () => {
    expect(() => {
      validateWinningNumbers("1,2,3,4,5,abc");
    }).toThrow("[ERROR]");
  });

  test("양의 정수가 아닌 값이 있으면 예외가 발생한다.", () => {
    expect(() => {
      validateWinningNumbers("1,2,3,4,5,abc");
    }).toThrow("[ERROR]");
  });
});

describe("validateBonusNumber 테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];

  test("정상적인 보너스 번호이면 숫자를 반환한다.", () => {
    const result = validateBonusNumber("7", winningNumbers);
    expect(result).toBe(7);
  });

  test("공백이 포함된 보너스 번호이면 trim 후 검증한다.", () => {
    const result = validateBonusNumber("  7  ", winningNumbers);
    expect(result).toBe(7);
  });

  test("빈 문자열이면 예외가 발생한다.", () => {
    expect(() => {
      validateBonusNumber("", winningNumbers);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호와 중복되면 예외가 발생한다.", () => {
    expect(() => {
      validateBonusNumber("6", winningNumbers);
    }).toThrow("[ERROR]");
  });

  test("범위를 벗어난 번호이면 예외가 발생한다.", () => {
    expect(() => {
      validateBonusNumber("46", winningNumbers);
    }).toThrow("[ERROR]");
  });

  test("숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      validateBonusNumber("abc", winningNumbers);
    }).toThrow("[ERROR]");
  });
});

describe("incrementCount 테스트", () => {
  test("3개 일치이면 result[0]의 count가 증가한다.", () => {
    const result = structuredClone(winningInfo);
    incrementCount(result, 3, false);

    expect(result[0].count).toBe(1);
  });

  test("4개 일치이면 result[1]의 count가 증가한다.", () => {
    const result = structuredClone(winningInfo);
    incrementCount(result, 4, false);

    expect(result[1].count).toBe(1);
  });

  test("5개 일치이고 보너스 숫자가 일치하지 않으면 result[2]의 count가 증가한다.", () => {
    const result = structuredClone(winningInfo);
    incrementCount(result, 5, false);

    expect(result[2].count).toBe(1);
    expect(result[BONUS_PRIZE_INDEX].count).toBe(0);
  });

  test("5개 일치이고 보너스 숫자가 일치하면 result[3]의 count가 증가한다.", () => {
    const result = structuredClone(winningInfo);
    incrementCount(result, 5, true);

    expect(result[2].count).toBe(0);
    expect(result[BONUS_PRIZE_INDEX].count).toBe(1);
  });

  test("6개 일치이면 result[4]의 count가 증가한다.", () => {
    const result = structuredClone(winningInfo);
    incrementCount(result, 6, false);

    expect(result[4].count).toBe(1);
  });

  test("2개 이하 일치이면 count가 증가하지 않는다.", () => {
    const result = structuredClone(winningInfo);
    incrementCount(result, 2, false);

    result.forEach((item) => {
      expect(item.count).toBe(0);
    });
  });
});

describe("calcWinningResult 테스트", () => {
  test("당첨된 로또가 있으면 해당 등수 count가 증가한다.", () => {
    const lottoArray = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([1, 2, 3, 4, 10, 11]),
      new Lotto([1, 2, 3, 10, 11, 12]),
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const result = calcWinningResult(lottoArray, winningNumbers, bonusNumber);

    expect(result[0].count).toBe(1);
    expect(result[1].count).toBe(1);
    expect(result[2].count).toBe(0);
    expect(result[BONUS_PRIZE_INDEX].count).toBe(1);
    expect(result[4].count).toBe(1);
  });
});

describe("calcTotalYield 테스트", () => {
  test("당첨금이 없으면 수익률은 0.0%이다.", () => {
    const result = structuredClone(winningInfo);
    const purchasePrice = 1000;

    const totalYield = calcTotalYield(result, purchasePrice);

    expect(totalYield).toBe("0.0");
  });

  test("당첨금이 있으면 수익률을 계산한다.", () => {
    const result = structuredClone(winningInfo);
    result[0].count = 1;
    result[1].count = 1;
    const purchasePrice = 10000;

    const totalYield = calcTotalYield(result, purchasePrice);

    expect(totalYield).toBe("550.0");
  });

  test("수익률은 소수점 첫째 자리까지 반환한다.", () => {
    const result = structuredClone(winningInfo);
    result[0].count = 1;
    const purchasePrice = 3000;

    const totalYield = calcTotalYield(result, purchasePrice);

    expect(totalYield).toBe("166.7");
  });

  test("모든 등수 당첨 시 수익률을 계산한다.", () => {
    const result = structuredClone(winningInfo);
    result[0].count = 1;
    result[1].count = 1;
    result[2].count = 1;
    result[BONUS_PRIZE_INDEX].count = 1;
    result[4].count = 1;
    const purchasePrice = 10000;

    const totalYield = calcTotalYield(result, purchasePrice);

    expect(totalYield).toBe("20315550.0");
  });
});
