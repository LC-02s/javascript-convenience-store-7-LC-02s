import { MEMBERSHIP_DISCOUNT } from '../src/constants/index.js';
import { Membership } from '../src/model/index.js';

describe('멤버십 클래스 테스트', () => {
  test('멤버십 할인을 적용하면 30% 차감된 금액을 반환한다.', () => {
    const input = 10_000;
    const expectedDiscount = input * MEMBERSHIP_DISCOUNT.RATE;
    const { purchaseAmount, discounted } = Membership.computeDiscount(input);

    expect(purchaseAmount).toBe(input - expectedDiscount);
    expect(discounted).toBe(expectedDiscount);
  });

  test('멤버십 할인 한도를 넘을 경우 한도 만큼 차감된 금액을 반환한다.', () => {
    const input = 30_000;
    const { purchaseAmount, discounted } = Membership.computeDiscount(input);

    expect(purchaseAmount).toBe(input - MEMBERSHIP_DISCOUNT.LIMIT);
    expect(discounted).toBe(MEMBERSHIP_DISCOUNT.LIMIT);
  });
});
