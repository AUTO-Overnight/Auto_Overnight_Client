import client from "../../../../api/client";
import { Login } from "../interface/user";

export const getLogin = async ({ id, password } : Login) => {
  id = encodeURIComponent(id);
  password = encodeURIComponent(password);
  
  const user = JSON.stringify({
    id: id,
    password: password,
  });
  console.log(user);
  
  return client.post("/login", user);
};
