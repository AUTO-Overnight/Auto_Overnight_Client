export interface Login {
  id: string,
  password: string,
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
}

export interface AuthStore {
  login: void;
  logout: void;
}