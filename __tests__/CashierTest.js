import { ProductDatabase } from '../src/data/index.js';
import { Cashier, PromotionChecker } from '../src/model/index.js';

describe('캐셔 클래스 테스트', () => {
  const productDB = new ProductDatabase();
  const checker = new PromotionChecker();
  const casherConstructor = (testInput) => {
    return new Cashier(testInput, productDB, checker);
  };
  const mockedConfirmReader = (res) => {
    return () => Promise.resolve(res);
  };

  test('총 구매금액을 계산할 시 올바른 금액을 반환한다.', async () => {
    const testInput = [{ name: '콜라', quantity: 2 }];
    const cashier = casherConstructor(testInput);

    const { totalPurchaseAmount } = await cashier.compute(mockedConfirmReader(true));

    expect(totalPurchaseAmount).toBe(2_000);
  });

  test('총 구매수량을 계산할 시 올바른 수량을 반환한다.', async () => {
    const testInput = [
      { name: '콜라', quantity: 2 },
      { name: '감자칩', quantity: 1 },
      { name: '에너지바', quantity: 3 },
    ];
    const cashier = casherConstructor(testInput);

    const { totalQuantity } = await cashier.compute(mockedConfirmReader(true));

    expect(totalQuantity).toBe(6);
  });

  test('증정품 목록 구분 시 올바르게 분리한다.', async () => {
    const testInputs = [
      {
        testInput: [
          { name: '콜라', quantity: 3 },
          { name: '감자칩', quantity: 2 },
        ],
        testOutput: [
          { name: '콜라', quantity: 1 },
          { name: '감자칩', quantity: 1 },
        ],
      },
      {
        testInput: [
          { name: '오렌지주스', quantity: 6 },
          { name: '초코바', quantity: 4 },
        ],
        testOutput: [
          { name: '오렌지주스', quantity: 3 },
          { name: '초코바', quantity: 2 },
        ],
      },
    ];

    for (const { testInput, testOutput } of testInputs) {
      const cashier = casherConstructor(testInput);

      const { giftList } = await cashier.compute(mockedConfirmReader(true));

      testOutput.forEach((output, i) => {
        const gift = giftList[i];

        expect(gift.name).toBe(output.name);
        expect(gift.quantity).toBe(output.quantity);
      });
    }
  });

  test('프로모션 할인 금액을 계산할 시 올바른 할인 금액을 반환한다.', async () => {
    const testInput = [
      { name: '콜라', quantity: 3 },
      { name: '감자칩', quantity: 2 },
    ];
    const cashier = casherConstructor(testInput);

    const { promotionDiscount } = await cashier.compute(mockedConfirmReader(true));

    expect(promotionDiscount).toBe(2_500);
  });

  test('지불 금액 계산 시 올바른 금액을 반환한다.', async () => {
    const cashier = casherConstructor([]);

    const payment = cashier.computePayment({
      totalPurchaseAmount: 8_000,
      promotionDiscount: 1_000,
      membershipDiscount: 1_000,
    });

    expect(payment).toBe(6_000);
  });
});
