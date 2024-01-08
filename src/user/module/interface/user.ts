export interface Login {
  id: string;
  password: string;
}

export interface User {
  set(data: Partial<User>): void;
  cookies: string;
  name: string;
  yy: string;
  tmGbn: string;
  outStayFrDt: string[];
  outStayToDt: string[];
  outStayStGbn: string[];
  // 세터 함수 타입 정의 추가
  setOutStayFrDt: (outStayFrDt: string[]) => void;
  setOutStayToDt: (outStayToDt: string[]) => void;
  setOutStayStGbn: (outStayStGbn: string[]) => void;
}

export interface AuthStore {
  login: void;
  logout: void;
}
