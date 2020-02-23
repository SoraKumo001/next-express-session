import expressSession from "express-session";
import { NextPageContext, NextComponentType } from "next";
import Express from "express";

const defaultOptions = {
  secret: "secret",
  resave: false,
  saveUninitialized: false
};
let session: Express.RequestHandler;
export const initialSession = (
  ctx: NextPageContext | { res: Request; req: Response },
  options?: expressSession.SessionOptions
) => {
  if (!session) session = expressSession({ ...defaultOptions, ...options });
  return new Promise<{ [key: string]: unknown } | undefined>(resolve => {
    const { req, res } = ctx as typeof ctx & {
      req: Express.Request & { session?: { [key: string]: string } };
      res: Express.Response;
    };
    if (!req) return resolve(undefined);
    session(req, res, () => resolve(req.session));
  });
};
export interface NextSessionPageContext extends NextPageContext {
  session: { [key: string]: unknown };
}
interface Session {
  [key: string]: unknown;
}
export type NextSessionPage<IP = {}, P = {}> = NextComponentType<
  NextSessionPageContext,
  IP,
  P & IP & { session: Session }
>;

export const createSessionProps = (session?: Session) => {
  if (!session) return {};
  const result: Session = {};
  for (const [key, value] of Object.entries(session))
    key !== "cookie" && (result[key] = value);
  return { ...result, session: result };
};
export const initProps = (page: NextSessionPage, session: Session) => {
  if (session) page.defaultProps = session;
};
