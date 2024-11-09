import { PromotionDatabase } from '../src/data/index.js';

describe('상품 데이터베이스 테스트', () => {
  const mockedPromotion = {
    id: 0,
    name: '탄산2+1',
    buy: 2,
    get: 1,
    start_date: '2024-01-01',
    end_date: '2024-12-31',
  };

  test('프로모션 데이터베이스는 이름을 기반으로 검색 시 해당하는 프로모션을 반환한다.', () => {
    const promotionDB = new PromotionDatabase();

    const promotion = promotionDB.findByName({ name: mockedPromotion.name });

    Object.entries(mockedPromotion).forEach(([key, value]) => {
      expect(promotion[key]).toBe(value);
    });
  });

  test('프로모션 데이터베이스는 없는 이름을 기반으로 검색 시 프로모션을 반환하지 않는다.', () => {
    const promotionDB = new PromotionDatabase();

    const promotion = promotionDB.findByName({ name: '' });

    expect(!!promotion).toBe(false);
  });
});
