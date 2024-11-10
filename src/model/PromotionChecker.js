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
