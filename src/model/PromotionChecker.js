import { DateTimes } from '@woowacourse/mission-utils';
import { ProductDatabase, PromotionDatabase } from '../data/index.js';

/**
 * @typedef {import('../types/index.js').Product} Product
 * @typedef {import('../types/index.js').Promotion} Promotion
 */

class PromotionChecker {
  /** @type {ProductDatabase} */
  #productDB;

  /** @type {PromotionDatabase} */
  #promotionDB;

  /** @param {ProductDatabase} productDB */
  constructor(productDB) {
    this.#productDB = productDB;
    this.#promotionDB = new PromotionDatabase();
  }

  /**
   * @param {Pick<Product, 'name' | 'quantity'>} product
   * @returns {{ type: 'stock' | 'additional', quantity: number; } | null}
   */
  recommend(product) {
    const promotionProduct = this.#productDB.findWithPromotionByName(product);
    const promotion = this.getValidPromotion(promotionProduct?.promotion ?? '');

    if (!promotion) {
      return null;
    }

    return this.#computeResult({ product, promotionProduct, promotion });
  }

  /**
   * @param {{ product: Pick<Product, 'name' | 'quantity'>; promotionProduct: Product; promotion: Promotion; }} param
   * @returns {{ type: 'stock' | 'additional', quantity: number; } | null}
   */
  #computeResult({ product, promotionProduct: { quantity }, promotion }) {
    if (quantity < product.quantity) {
      const unit = promotion.buy + promotion.get;
      const count = Math.floor(quantity / unit);
      const shortfall = quantity - unit * count;
      const stock = product.quantity - quantity + shortfall;

      return { type: 'stock', quantity: stock };
    }

    return this.#computeAdditionalProduct({ product, promotion });
  }

  /**
   * @param {{ product: Pick<Product, 'name' | 'quantity'>; promotion: Promotion; }} param
   * @returns {{ type: 'additional', quantity: number; } | null}
   */
  #computeAdditionalProduct({
    product: { quantity },
    promotion: { get, buy },
  }) {
    const unit = buy + get;
    const count = Math.floor(quantity / unit);
    const rest = quantity - unit * count;

    if (rest === buy) {
      return { type: 'additional', quantity: get };
    }

    return null;
  }

  /** @param {Promotion['name']} name */
  getValidPromotion(name) {
    const promotion = this.#promotionDB.findByName({ name });

    if (!promotion || !this.#isValidPromotion(promotion)) {
      return null;
    }

    return promotion;
  }

  /** @param {Pick<Promotion, 'start_date' | 'end_date'>} promotion */
  #isValidPromotion({ start_date, end_date }) {
    const getTime = (value) => new Date(value).getTime();
    const start = getTime(start_date);
    const end = getTime(end_date);
    const now = getTime(DateTimes.now());

    return start <= now && now < end;
  }
}

export default PromotionChecker;
