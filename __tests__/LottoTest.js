import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  describe("로또 번호 검증 테스트", () => {
    test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow("[ERROR]");
    });

    // TODO: 테스트가 통과하도록 프로덕션 코드 구현
    test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 5]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 0이 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([0, 1, 2, 3, 4, 5]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 음수가 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([-1, 1, 2, 3, 4, 5]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 45보다 큰 숫자가 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 46]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 null이 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, null]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 undefined가 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, undefined]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 빈 문자열이 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, ""]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 문자열이 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, "abc"]);
      }).toThrow("[ERROR]");
    });

    test("로또 번호에 소수가 포함되면 예외가 발생한다.", () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 1.5]);
      }).toThrow("[ERROR]");
    });
  });

  describe("numbers getter 테스트", () => {
    test("numbers getter가 로또 번호를 반환한다.", () => {
      const numbers = [1, 15, 25, 35, 40, 45];
      const lotto = new Lotto(numbers);
      expect(lotto.numbers).toEqual(numbers);
    });
  });

  describe("getMatchCount 테스트", () => {
    test("당첨 번호와 일치하는 개수를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 7, 8, 9];
      expect(lotto.getMatchCount(winningNumbers)).toBe(3);
    });

    test("일치하는 번호가 없으면 0을 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [7, 8, 9, 10, 11, 12];
      expect(lotto.getMatchCount(winningNumbers)).toBe(0);
    });
  });

  describe("getHasBonus 테스트", () => {
    test("보너스 번호가 포함되어 있으면 true를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.getHasBonus(6)).toBe(true);
    });

    test("보너스 번호가 포함되어 있지 않으면 false를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.getHasBonus(7)).toBe(false);
    });
  });
});
