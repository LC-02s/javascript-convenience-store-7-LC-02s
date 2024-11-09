import { Console } from '@woowacourse/mission-utils';
import { PRODUCT_INPUT, ERROR_MESSAGE } from '../constants/index.js';
import { Exception } from '../utils/index.js';

class InputView {
  static async readProductSelection() {
    const { PREFIX, POSTFIX, SEPARATOR } = PRODUCT_INPUT;
    const guide = `구매하실 상품명과 수량을 입력해 주세요. (예: ${PREFIX}사이다${SEPARATOR}2${POSTFIX},${PREFIX}감자칩${SEPARATOR}1${POSTFIX})`;
    const input = await InputView.#readUserInput(guide);

    return input.split(',');
  }

  static async #readUserInput(message) {
    /** @type {string} */
    const input = await Console.readLineAsync('\n' + message + '\n');
    const value = input.trim();

    if (!value) {
      throw new Exception(ERROR_MESSAGE.INVALID_INPUT);
    }

    return value;
  }
}

export default InputView;
