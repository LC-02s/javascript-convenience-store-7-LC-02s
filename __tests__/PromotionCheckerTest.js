import { MissionUtils } from '@woowacourse/mission-utils';
import { ProductDatabase } from '../src/data/index.js';
import { PromotionChecker } from '../src/model/index.js';

const mockNowDate = (date = null) => {
  const mockDateTimes = jest.spyOn(MissionUtils.DateTimes, 'now');
  mockDateTimes.mockReturnValue(new Date(date));
  return mockDateTimes;
};

describe('프로모션 클래스 테스트', () => {
  const productDB = new ProductDatabase();
  const checker = new PromotionChecker(productDB);

  test.each([
    [
      '프로모션 적용이 가능한 상품에 대해 고객이 해당 수량만큼 가져오지 않았을 경우 해당하는 타입과 추가 가능한 수량을 출력한다.',
      [
        [
          { name: '콜라', quantity: 8 },
          JSON.stringify({ type: 'additional', quantity: 1 }),
        ],
        [
          { name: '감자칩', quantity: 1 },
          JSON.stringify({ type: 'additional', quantity: 1 }),
        ],
        [
          { name: '초코바', quantity: 3 },
          JSON.stringify({ type: 'additional', quantity: 1 }),
        ],
      ],
    ],
    [
      '프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우 해당하는 타입과 부족한 재고분 수량을 출력한다.',
      [
        [
          { name: '콜라', quantity: 14 },
          JSON.stringify({ type: 'stock', quantity: 5 }),
        ],
        [
          { name: '초코바', quantity: 6 },
          JSON.stringify({ type: 'stock', quantity: 2 }),
        ],
        [
          { name: '감자칩', quantity: 8 },
          JSON.stringify({ type: 'stock', quantity: 4 }),
        ],
      ],
    ],
  ])('%s', (_, testInputs) => {
    testInputs.forEach(([testInput, expectedOutput]) => {
      const result = checker.recommend(testInput);
      expect(JSON.stringify(result)).toBe(expectedOutput);
    });
  });

  test('기간에 해당하지 않는 프로모션일 경우 null을 반환한다.', () => {
    jest.clearAllMocks();

    mockNowDate('2024-02-01');

    const result = checker.recommend({ name: '감자칩', quantity: 2 });

    expect(result).toBe(null);

    jest.restoreAllMocks();
  });
});
