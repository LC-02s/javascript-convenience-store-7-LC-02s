import { Console } from '@woowacourse/mission-utils';
import {
  PRODUCT_INPUT,
  CONFIRM_FLAG,
  ERROR_MESSAGE,
} from '../constants/index.js';
import { Exception, getUserInputLoop } from '../utils/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class InputView {
  static async readProductSelection() {
    const { PREFIX, POSTFIX, SEPARATOR } = PRODUCT_INPUT;
    const guide = `구매하실 상품명과 수량을 입력해 주세요. (예: ${PREFIX}사이다${SEPARATOR}2${POSTFIX},${PREFIX}감자칩${SEPARATOR}1${POSTFIX})`;
    const input = await InputView.#readUserInput(guide);

    return input.split(',');
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  static async confirmAdditionalFreeProduct({ name, quantity }) {
    return await InputView.#generateConfirmReader({
      guide: `현재 ${name}은(는) ${quantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까?`,
    });
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  static async confirmPurchaseWithoutDiscount({ name, quantity }) {
    return await InputView.#generateConfirmReader({
      guide: `현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까?`,
    });
  }

  static async confirmMembershipDiscount() {
    return await InputView.#generateConfirmReader({
      guide: '멤버십 할인을 받으시겠습니까?',
    });
  }

  static async confirmToBuyOtherProducts() {
    return await InputView.#generateConfirmReader({
      guide: '감사합니다. 구매하고 싶은 다른 상품이 있나요?',
    });
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
