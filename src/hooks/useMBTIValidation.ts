import { useState } from 'react';

enum MBTI {
  ENFP = 'ENFP',
  ENFJ = 'ENFJ',
  ENTP = 'ENTP',
  ENTJ = 'ENTJ',
  ESFP = 'ESFP',
  ESFJ = 'ESFJ',
  ESTP = 'ESTP',
  ESTJ = 'ESTJ',
  INFP = 'INFP',
  INFJ = 'INFJ',
  INTP = 'INTP',
  INTJ = 'INTJ',
  ISFP = 'ISFP',
  ISFJ = 'ISFJ',
  ISTP = 'ISTP',
  ISTJ = 'ISTJ',
}

const isValidMBTI = (mbti: string): boolean => {
  return Object.values(MBTI).includes(mbti as MBTI);
};

const isContainKorean = (value: string): boolean => {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);
};

const useMBTIValidation = () => {
  const [mbtiError, setMbtiError] = useState<string | null>(null);

  const validateMBTI = (value: string) => {
    if (isContainKorean(value)) {
      setMbtiError('MBTI는 영어 4글자로 입력해주세요.');
    } else if (value && !isValidMBTI(value)) {
      setMbtiError('유효한 MBTI 값을 입력하세요.');
    } else {
      setMbtiError(null);
    }
  };

  return { mbtiError, setMbtiError, validateMBTI };
};

export { useMBTIValidation };
