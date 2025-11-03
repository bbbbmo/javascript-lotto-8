import { Console } from "@woowacourse/mission-utils";

export const parseInput = async (field) => {
  const rawInput = await Console.readLineAsync(`${field}을 입력해 주세요.\n`);
  return rawInput.trim();
};
