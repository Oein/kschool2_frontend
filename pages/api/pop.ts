// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const KEY = process.env.NEIS_API_KEY;
const INDEX_MAX = process.env.SCHOOL_INDEX_MAX;

const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://kschool.vercel.app, https://kschool-oein.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST")
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

export default allowCors(function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise<void>(async (resolve, reject) => {});
});
