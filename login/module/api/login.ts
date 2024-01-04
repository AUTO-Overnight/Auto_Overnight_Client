import client from "../../../api/client";
import { User } from "../interface/login";

export const getLogin = async ({ id, password } : User) => {
  id = encodeURIComponent(id);
  password = encodeURIComponent(password);
  
  const user = JSON.stringify({
    id: id,
    password: password,
  });
  console.log(user);
  
  return client.post("/login", user);
};
