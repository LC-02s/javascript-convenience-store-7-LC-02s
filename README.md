# javascript-convenience-store-precourse

## 기능 목록

- 상품 목록 출력 기능
  - 형식에 맞는 안내 문구 출력
  - 보유 중인 상품들을 순회하며 상품 정보 출력

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
  - 입력받은 상품 목록을 순회하며 장바구니 추가
    - 이미 있는 상품일 경우 개수 올림
    - 없는 상품일 경우 이름과 개수 추가