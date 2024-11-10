import { Console } from '@woowacourse/mission-utils';
import {
  PRODUCT_INPUT,
  CONFIRM_FLAG,
  ERROR_MESSAGE,
} from '../constants/index.js';
import { Exception, getUserInputLoop } from '../utils/index.js';

class InputView {
  static async readProductSelection() {
    const { PREFIX, POSTFIX, SEPARATOR } = PRODUCT_INPUT;
    const guide = `구매하실 상품명과 수량을 입력해 주세요. (예: ${PREFIX}사이다${SEPARATOR}2${POSTFIX},${PREFIX}감자칩${SEPARATOR}1${POSTFIX})`;
    const input = await InputView.#readUserInput(guide);

    return input.split(',');
  }

  /** @param {{ guide: string }} param */
  static async #generateConfirmReader({ guide }) {
    return await getUserInputLoop({
      reader: async () => {
        const message = `${guide} (${CONFIRM_FLAG.TRUE}/${CONFIRM_FLAG.FALSE})`;
        const input = await InputView.#readUserInput(message);

        return InputView.#parseBooleanResponse(input);
      },
    });
  }

  /** @param {string} value */
  static #parseBooleanResponse(value) {
    if (value === CONFIRM_FLAG.TRUE) {
      return true;
    }

    if (value === CONFIRM_FLAG.FALSE) {
      return false;
    }

    throw new Exception(ERROR_MESSAGE.INVALID_TYPE);
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
