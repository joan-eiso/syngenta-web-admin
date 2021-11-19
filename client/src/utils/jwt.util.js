import JWT from "jsonwebtoken";

export const encodePayload = (payload, token) => {  
  return JWT.sign(payload, token);
}