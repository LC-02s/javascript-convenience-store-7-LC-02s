# javascript-convenience-store-precourse

## 📋 기능 목록

- 상품 목록 출력 기능
  - 형식에 맞는 안내 문구 출력
  - 보유 중인 상품들을 순회하며 상품 정보 출력
    - 상품 개수가 0일 경우 "재고 없음"을 포함한 안내 문구 출력

- 상품 목록 입력 기능
  - 형식에 맞는 안내 문구 출력
  - 사용자 입력 대기
    - 입력값이 빈 문자열일 경우 예외 처리
    - 입력값을 쉼표로 분할
      - 쉼표로 분할되지 않는 경우 예외 처리
      - 분할한 값이 빈 문자열 경우 예외 처리
      - 분할한 값이 "["로 시작하지 않는 경우 예외 처리
      - 분할한 값이 "]"로 끝나지 않는 경우 예외 처리
      - 분할한 값이 "-"를 1개만 포함하지 않는 경우 예외 처리
        - 분할한 값에서 "["와 "]"를 제거한 문자열을 추출
        - 추출한 문자열을 "-"로 분할하여 이름과 수량을 추출
        - 추출한 이름이 빈 문자열일 경우 예외 처리
        - 추출한 이름에 해당하는 상품이 없을 경우 예외 처리
        - 추출한 수량이 숫자가 아닐 경우 예외 처리
        - 추출한 수량이 정수가 아닐 경우 예외 처리
        - 추출한 수량이 1보다 작을 경우 예외 처리
        - 추출한 수량이 실 재고보다 많을 경우 예외 처리
  - 예외가 있을 경우 해당하는 예외 문구 출력 후 재입력 대기

- 장바구니 기능
  - 상품 목록 추가 기능
    - 입력받은 상품 목록을 순회하며 장바구니 추가
      - 이미 있는 상품일 경우 수량 추가
      - 없는 상품일 경우 이름과 수량 추가
  - 상품 삭제 기능
    - 입력받은 상품 조회
    - 차감할 수량이 기존 수량보다 크거나 같을 경우 상품 삭제
    - 차감할 수량이 기존 수량보다 작을 경우 상품 수량 차감

- 프로모션 할인 기능
  - 상품 목록을 순회하며 프로모션 조회
  - 상품에 해당하는 프로모션이 있을 경우
    - 프로모션 시작 날짜가 오늘 날짜보다 미래일 경우 해당 상품 건너뜀
    - 프로모션 종료 날짜가 오늘 날짜보다 과거일 경우 해당 상품 건너뜀
      - 프로모션 날짜가 유효한 경우
        - 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 그 수량만큼 추가 여부를 입력
          - 형식에 맞는 안내 문구 출력
            - 사용자 입력 대기
            - 입력한 값이 "Y" 또는 "N"이 아닐 경우 예외 처리
            - 예외가 있을 경우 해당하는 예외 문구 출력 후 재입력 대기
          - "Y"일 경우 장바구니에 증정품 추가
          - "F"일 경우 해당 상품 건너뜀
        - 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제할지 여부를 입력
          - 형식에 맞는 안내 문구 출력
            - 사용자 입력 대기
            - 입력한 값이 "Y" 또는 "N"이 아닐 경우 예외 처리
            - 예외가 있을 경우 해당하는 예외 문구 출력 후 재입력 대기
          - "Y"일 경우 해당 상품 건너뜀
          - "F"일 경우 일부 수량 만큼 장바구니 내 상품 수량 차감
  - 상품에 해당하는 프로모션이 없을 경우 해당 상품 건너뜀

- 멤버십 할인 적용 기능
  - 멤버십 적용 확인
    - 형식에 맞는 안내 문구 출력
    - 사용자 입력 대기
    - 입력한 값이 "Y" 또는 "N"이 아닐 경우 예외 처리
    - 예외가 있을 경우 해당하는 예외 문구 출력 후 재입력 대기
  - "Y"를 입력한 경우
    - 프로모션 할인 금액을 제외한 총 구매 금액의 30% 할인된 금액 반환
      - 할인 금액이 8,000원이 넘을 경우 8,000원을 차감한 금액 반환
    - 프로모션 할인 금액을 제외한 총 구매 금액의 30%에 해당하는 할인 금액 반환
      - 할인 금액이 8,000원이 넘을 경우 8,000원 반환
  - "N"를 입력한 경우 다음 프로세스로 이동

- 영수증 출력 기능
  - 영수증 제목 출력
  - 상품명, 수량, 금액으로 구성된 제목 행 출력
  - 구입한 상품들을 순회하며 출력
  - 증정품 제목 출력
  - 증정품들을 순회하며 출력
  - 결과 제목 출력
  - 할인 적용 전 총 구매수량 및 구매액 출력
  - 프로모션으로 할인된 금액 출력
  - 멤버십으로 할인된 금액 출력
  - 총 구매액에서 총 할인금액을 차감한 금액 출력

- 재고 관리 기능
  - 구매한 상품들을 순회하며 재고 수량 차감
    - 프로모션이 있는 상품을 우선 차감

- 추가 구매 여부 입력 기능
  - 형식에 맞는 안내 문구 출력
  - 사용자 입력 대기
    - 입력한 값이 "Y" 또는 "N"이 아닐 경우 예외 처리
    - 예외가 있을 경우 해당하는 예외 문구 출력 후 재입력 대기
  - 입력 값이 "Y"일 경우 상품 목록 출력 기능 재실행
  - 입력 값이 "N"일 경우 프로그램 종료

<br />

## 🌲 폴더 구조

```
📦
├─ __tests__
│  ├─ ApplicationTest.js
│  ├─ CartTest.js
│  ├─ CashierTest.js
│  ├─ MembershipTest.js
│  ├─ ProductDatabaseTest.js
│  ├─ PromotionCheckerTest.js
│  └─ PromotionDatabaseTest.js
├─ public
│  ├─ products.md
│  └─ promotions.md
└─ src
   ├─ App.js
   ├─ constants
   │  ├─ confirm-flag.js
   │  ├─ data-path.js
   │  ├─ error-message.js
   │  ├─ error-prefix.js
   │  ├─ index.js
   │  ├─ membership-discount.js
   │  └─ product-input.js
   ├─ controller
   │  ├─ StoreController.js
   │  └─ index.js
   ├─ data
   │  ├─ ProductDatabase.js
   │  ├─ PromotionDatabase.js
   │  └─ index.js
   ├─ index.js
   ├─ model
   │  ├─ Cart.js
   │  ├─ Cashier.js
   │  ├─ Membership.js
   │  ├─ ProductValidator.js
   │  ├─ PromotionChecker.js
   │  └─ index.js
   ├─ types
   │  ├─ Product.js
   │  ├─ Promotion.js
   │  └─ index.js
   ├─ utils
   │  ├─ Exception.js
   │  ├─ formatKRW.js
   │  ├─ getUserInputLoop.js
   │  ├─ index.js
   │  ├─ padding.js
   │  ├─ parseCSV.js
   │  └─ readFileSync.js
   └─ view
      ├─ InputView.js
      ├─ OutputView.js
      └─ index.js
```

<br />

## 🖥️ 실행 화면

<img width="860" alt="실행 화면 1" src="https://github.com/user-attachments/assets/5157b6e9-807c-4b42-bcc6-8163a966e8dc">

<img width="860" alt="실행 화면 2" src="https://github.com/user-attachments/assets/76ff88b5-3147-4cdc-b1a6-763a88aed63f">

<img width="860" alt="실행 화면 3" src="https://github.com/user-attachments/assets/b34d62d0-94b0-44cd-9913-8a483b15015a">


