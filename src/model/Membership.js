import { MEMBERSHIP_DISCOUNT } from '../constants/index.js';

class Membership {
  /** @param {number} totalPurchaseAmount */
  static computeDiscount(totalPurchaseAmount) {
    const { RATE, LIMIT } = MEMBERSHIP_DISCOUNT;
    const discounted = totalPurchaseAmount * RATE;

    if (discounted >= LIMIT) {
      return { purchaseAmount: totalPurchaseAmount - LIMIT, discounted: LIMIT };
    }

    return { purchaseAmount: totalPurchaseAmount - discounted, discounted };
  }
}

export default Membership;
