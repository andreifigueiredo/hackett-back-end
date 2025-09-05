import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  frontEndUrl: process.env.FRONT_END_URL
}));