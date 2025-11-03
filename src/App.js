import { startLottoMachine } from "./lottoMachine.js";
import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      await startLottoMachine();
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
