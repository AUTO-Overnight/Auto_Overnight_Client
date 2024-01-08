module.exports = {
  parser: '@typescript-eslint/parser', // TypeScript 파서 사용
  extends: [
    'plugin:react/recommended', // React 권장 규칙 사용
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 규칙 사용
    'prettier', // Prettier와 충돌하지 않는 ESLint 규칙 사용
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙 위반을 ESLint 오류로 표시
    // 기타 ESLint 규칙을 여기에 추가
  },
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
  },
};
