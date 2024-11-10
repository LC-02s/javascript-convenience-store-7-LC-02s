import { Console } from '@woowacourse/mission-utils';
import { formatKRW, padLeft, padRight } from '../utils/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class OutputView {
  static #RECEIPT_TITLE = `===========W 편의점=============`;
  static #RECEIPT_GIFT_TITLE = `===========증	 정=============`;
  static #RECEIPT_TOTAL_TITLE = `==============================`;

  static #RECEIPT_PADDING = Object.freeze({
    NAME: 14,
    QUANTITY: 5,
    PRICE: 10,
  });

  /** @param {Product[]} productList */
  static printProductAll(productList) {
    OutputView.#printProductGuideComment();
    productList.forEach((product) => {
      Console.print(OutputView.#getProductGuide(product));
    });
  }

  static #printProductGuideComment() {
    Console.print('\n안녕하세요. W편의점입니다.');
    Console.print('현재 보유하고 있는 상품입니다.\n');
  }

  /** @param {Omit<Product, 'id'>} product */
  static #getProductGuide({ name, price, quantity, promotion }) {
    if (!quantity) {
      return `- ${name} ${formatKRW(price)}원 재고 없음 ${promotion ?? ''}`;
    }

    return `- ${name} ${formatKRW(price)}원 ${quantity}개 ${promotion ?? ''}`;
  }

  /** @param {{ productList: Pick<Product, 'name' | 'quantity' | 'price'>[]; giftList: Pick<Product, 'name' | 'quantity'>[]; }} param */
  static printReceiptProductList({ productList, giftList }) {
    Console.print(OutputView.#RECEIPT_TITLE);
    OutputView.#printReceiptColum();
    productList.forEach(OutputView.#printReceiptProduct);
    Console.print(OutputView.#RECEIPT_GIFT_TITLE);
    giftList.forEach(OutputView.#printReceiptProduct);
  }

  static #printReceiptColum() {
    const { NAME, QUANTITY, PRICE } = OutputView.#RECEIPT_PADDING;
    const printingName = padRight('상품명', NAME);
    const printingQuantity = padRight('수량', QUANTITY);
    const printingPrice = padRight('금액', PRICE);

    Console.print(printingName + printingQuantity + printingPrice);
  }

  /** @param {Pick<Product, 'name' | 'quantity' | 'price'>} product */
  static #printReceiptProduct({ name, quantity, price }) {
    const { NAME, QUANTITY, PRICE } = OutputView.#RECEIPT_PADDING;
    const printing =
      padRight(name, NAME) + padRight(String(quantity), QUANTITY);

    if (!price) {
      return Console.print(printing);
    }

    Console.print(printing + padLeft(formatKRW(price), PRICE));
  }
}

export default OutputView;
