import { Console } from '@woowacourse/mission-utils';
import { formatKRW } from '../utils/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class OutputView {
  /** @param {Product[]} productList */
  static printProductAll(productList) {
    OutputView.#printProductGuideComment();
    productList.forEach((product) => {
      Console.print(OutputView.#getProductGuide(product));
    });
  }

  static #printProductGuideComment() {
    Console.print('안녕하세요. W편의점입니다.');
    Console.print('현재 보유하고 있는 상품입니다.\n');
  }

  /** @param {Omit<Product, 'id'>} product */
  static #getProductGuide({ name, price, quantity, promotion }) {
    if (!quantity) {
      return `- ${name} ${formatKRW(price)}원 재고 없음 ${promotion ?? ''}`;
    }

    return `- ${name} ${formatKRW(price)}원 ${quantity}개 ${promotion ?? ''}`;
  }
}

export default OutputView;
