import client from "../../../api/client";
import { CallBonusPoint } from "../interface/bonusPoint";

export const getBonusPoint = async ({ name, cookies, yy, tmGbn } : CallBonusPoint) => {
  const bonusPoint = JSON.stringify({
    userNm: name,
    cookies: cookies,
    yy: yy,
    tmGbn: tmGbn,
  });
  
  return client.post("/findpointlist", bonusPoint);
};
