import { ProductDatabase } from '../src/data/index.js';

describe('상품 데이터베이스 테스트', () => {
  const mockedProductList = [
    {
      id: 0,
      name: '콜라',
      price: 1000,
      quantity: 10,
      promotion: '탄산2+1',
    },
    {
      id: 1,
      name: '콜라',
      price: 1000,
      quantity: 10,
      promotion: null,
    },
  ];

  test('상품 데이터베이스는 id 기반으로 상품을 검색할 수 있다.', () => {
    const productDB = new ProductDatabase();

    mockedProductList.forEach((mockedProduct) => {
      const product = productDB.findById(mockedProduct);

      Object.entries(mockedProduct).forEach(([key, value]) => {
        expect(product[key]).toBe(value);
      });
    });
  });

  test('상품 데이터베이스는 이름을 기반으로 검색 시 해당하는 모든 상품을 반환한다.', () => {
    const targetName = mockedProductList[0].name;

    const productDB = new ProductDatabase();

    const productList = productDB.findByName({ name: targetName });

    expect(productList.length).toBe(mockedProductList.length);

    productList.forEach((product, i) => {
      const mockedProduct = mockedProductList[i];

      Object.entries(mockedProduct).forEach(([key, value]) => {
        expect(product[key]).toBe(value);
      });
    });
  });

  test('상품 데이터베이스는 이름과 수량을 입력할 시 해당하는 상품의 수량을 조정한다.', () => {
    [
      [5, 5, 10],
      [10, 0, 10],
      [11, 0, 9],
      [15, 0, 5],
      [20, 0, 0],
    ].forEach(([quantity, expectedQuantity1, expectedQuantity2]) => {
      const productDB = new ProductDatabase();

      productDB.putProductQuantityByName({ name: '콜라', quantity });

      const [result1, result2] = productDB.findByName({ name: '콜라' });

      expect(result1.quantity).toBe(expectedQuantity1);
      expect(result2.quantity).toBe(expectedQuantity2);
    });
  });
});
