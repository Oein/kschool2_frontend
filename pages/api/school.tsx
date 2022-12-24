// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const KEY = process.env.NEIS_API_KEY;
const INDEX_MAX = process.env.SCHOOL_INDEX_MAX;

const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
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
  return new Promise<void>(async (resolve, reject) => {
    let { schoolName } = req.query;

    schoolName ||= "";

    try {
      const URL = encodeURI(
        `https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=${INDEX_MAX}&KEY=${KEY}&SCHUL_NM=${schoolName}`
      );
      const { data } = await axios.get(URL);

      res.status(200).json({ data });
      resolve();
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: null });
      resolve();
    }
  });
});
