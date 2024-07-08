
# 사용 데이터 검증 라이브러리 
-> Typia

1. class-validator
   class-validator는 TypeScript 기반의 데이터 검증 라이브러리입니다.
   데코레이터 기반의 간단한 API를 제공하여 사용이 편리합니다.
   성능 측면에서는 Joi나 AJV에 비해 다소 느린 편입니다. 
2. Joi
   Joi는 JavaScript 기반의 데이터 검증 라이브러리입니다.
   풍부한 API와 다양한 검증 기능을 제공합니다.
   성능 측면에서는 AJV에 비해 다소 느린 편입니다. 
3. AJV
   AJV는 JSON Schema 기반의 데이터 검증 라이브러리입니다.
   성능이 매우 뛰어나며, 다른 라이브러리에 비해 빠른 편입니다.
   JSON Schema 기반이라 복잡한 스키마 정의가 가능하지만, 사용이 다소 복잡할 수 있습니다.
4. Typia 라이브러리
   Typia는 TypeScript 기반의 새로운 데이터 검증 라이브러리입니다.
   기존 솔루션에 비해 15,000배 빠른 성능을 자랑합니다.
   단순한 JSON 검증을 넘어 Protocol Buffer 등 다양한 데이터 형식을 지원합니다.
   지속적인 최적화를 통해 성능을 크게 향상시켰습니다.

