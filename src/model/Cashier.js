import { ProductDatabase } from '../data/index.js';
import PromotionChecker from './PromotionChecker.js';

/**
 * @typedef {import('../types/index.js').Product} Product
 * @typedef {import('../types/index.js').Promotion} Promotion
 */

class Cashier {
  /** @type {Pick<Product, 'name' | 'quantity'>[]} */
  #productList;

  /** @type {ProductDatabase} */
  #productDB;

  /** @type {PromotionChecker} */
  #checker;

  /**
   * @param {Pick<Product, 'name' | 'quantity'>[]} productList
   * @param {ProductDatabase} productDB
   * @param {PromotionChecker} promotionChecker
   */
  constructor(productList, productDB, promotionChecker) {
    this.#productList = productList;
    this.#productDB = productDB;
    this.#checker = promotionChecker;
  }

  #computeTotalPurchaseAmount() {
    return this.#productList.reduce((total, { name, quantity }) => {
      const unit = this.#productDB.findPriceByName({ name }) ?? 0;
      const price = unit * quantity;

      return total + price;
    }, 0);
  }

  #computeTotalPurchaseQuantity() {
    return this.#productList.reduce((total, { quantity }) => {
      return total + quantity;
    }, 0);
  }

  /** @param {Product[]} giftList */
  #computePromotionDiscount(giftList) {
    return giftList.reduce((total, { price, quantity }) => {
      return total + price * quantity;
    }, 0);
  }

  /** @return {Product[]} */
  #divideGiftList() {
    return this.#productList.reduce((giftList, product) => {
      return this.#divideGift(giftList, product);
    }, []);
  }

  /**
   * @param {Product[]} giftList
   * @param {Pick<Product, 'name' | 'quantity'>} product
   */
  #divideGift(giftList, { name, quantity }) {
    const target = this.#getProductAndPromotion(name);

    if (!target) return giftList;

    const { product, promotion } = target;
    const giftCount = this.#computeGiftCount({ ...promotion, quantity });

    if (giftCount < 1) return giftList;

    return [...giftList, { ...product, quantity: giftCount }];
  }

  /** @param {Promotion['name']} name */
  #getProductAndPromotion(name) {
    const product = this.#productDB.findWithPromotionByName({ name });

    if (!product) return null;

    const { promotion: key } = product;
    const promotion = this.#checker.getValidPromotion(key ?? '');

    if (!promotion) return null;

    return { product, promotion };
  }

  /** @param {{ buy: number; get: number; quantity: number; }} param */
  #computeGiftCount({ buy, get, quantity }) {
    const unit = buy + get;
    const count = Math.floor(quantity / unit);

    return get * count;
  }
}

export default Cashier;
