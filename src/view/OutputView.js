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
    Console.print('\n' + OutputView.#RECEIPT_TITLE);
    OutputView.#printReceiptColum();
    productList.forEach(OutputView.#printReceiptProduct);
    Console.print(OutputView.#RECEIPT_GIFT_TITLE);
    giftList.forEach(OutputView.#printReceiptProduct);
  }

  /** @param {{ totalPurchaseAmount: number; totalQuantity: number; promotionDiscount: number; membershipDiscount: number; payment: number; }} param */
  static printReceiptResult({ totalPurchaseAmount, totalQuantity, promotionDiscount, membershipDiscount, payment }) {
    Console.print(OutputView.#RECEIPT_TOTAL_TITLE);

    OutputView.#printTotalPurchaseAmountAndQuantity({ totalPurchaseAmount, totalQuantity });
    OutputView.#printDiscount({ promotion: promotionDiscount, membership: membershipDiscount });
    OutputView.#printPayment(payment);
  }

  /** @param {{ totalPurchaseAmount: number; totalQuantity: number; }} param */
  static #printTotalPurchaseAmountAndQuantity({ totalPurchaseAmount, totalQuantity }) {
    const { NAME, QUANTITY, PRICE } = OutputView.#RECEIPT_PADDING;
    const title = padRight('총 구매액', NAME);
    const quantity = padRight(totalQuantity.toString(), QUANTITY);
    const price = padLeft(formatKRW(totalPurchaseAmount), PRICE);

    Console.print(title + quantity + price);
  }

  /** @param {{ promotion: number; membership: number; }} discount  */
  static #printDiscount({ promotion, membership }) {
    OutputView.#printPromotionDiscount(promotion);
    OutputView.#printMembershipDiscount(membership);
  }

  /** @param {number} promotionDiscount  */
  static #printPromotionDiscount(promotionDiscount) {
    const { NAME, QUANTITY, PRICE } = OutputView.#RECEIPT_PADDING;
    const title = padRight('행사할인', NAME);
    const amount = `-${formatKRW(promotionDiscount)}`;

    Console.print(title + padLeft(amount, QUANTITY + PRICE));
  }

  /** @param {number} membershipDiscount  */
  static #printMembershipDiscount(membershipDiscount) {
    const { NAME, QUANTITY, PRICE } = OutputView.#RECEIPT_PADDING;
    const title = padRight('멤버십할인', NAME);
    const amount = `-${formatKRW(membershipDiscount)}`;

    Console.print(title + padLeft(amount, QUANTITY + PRICE));
  }

  /** @param {number} payment  */
  static #printPayment(payment) {
    const { NAME, QUANTITY, PRICE } = OutputView.#RECEIPT_PADDING;
    const title = padRight('내실돈', NAME);
    const amount = padLeft(formatKRW(payment), QUANTITY + PRICE);

    Console.print(title + amount);
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
    const printing = padRight(name, NAME) + padRight(String(quantity), QUANTITY);

    if (!price) {
      return Console.print(printing);
    }

    Console.print(printing + padLeft(formatKRW(price), PRICE));
  }
}

export default OutputView;
