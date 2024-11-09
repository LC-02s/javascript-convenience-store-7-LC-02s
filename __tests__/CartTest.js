import { ERROR_PREFIX } from '../src/constants/index.js';
import { ProductDatabase } from '../src/data/index.js';
import { Cart } from '../src/model/index.js';

describe('장바구니 클래스 테스트', () => {
  const productDB = new ProductDatabase();

  test.each([
    [
      '형식에 맞지 않는 값을 입력 시 예외가 발생한다.',
      ['', 'test', '콜라-3,감자칩-3', ' , , , '],
    ],
    [
      '상품을 찾을 수 없는 경우 예외가 발생한다.',
      ['[ㅁㄴㅇㄹ-2]', '[콜라-3],[test-12]'],
    ],
    [
      '상품 수량이 정수가 아닐 경우 예외가 발생한다.',
      ['[콜라-9],[감자칩-2.12]'],
    ],
    [
      '상품 수량이 1보다 작을 경우 예외가 발생한다.',
      ['[콜라-9],[감자칩-0]', '[탄산수-0],[초코바-2]'],
    ],
    [
      '상품 수량이 재고 수량을 넘는 경우 예외가 발생한다.',
      ['[콜라-9],[콜라-9],[콜라-9]', '[탄산수-12000]'],
    ],
  ])('%s', (_, testInputs) => {
    testInputs.forEach((testInput) => {
      const input = testInput.split(',');
      const tester = () => new Cart(input, productDB);
      expect(tester).toThrow(ERROR_PREFIX);
    });
  });
});
