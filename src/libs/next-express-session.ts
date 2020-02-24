import expressSession from "express-session";
import { NextPageContext, NextComponentType, NextPage } from "next";
import Express from "express";
import App from "next/app";

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
export interface Session {
  [key: string]: unknown;
}
export type NextSessionPage<SP = {}, IP = {}, P = {}> = NextComponentType<
  NextSessionPageContext,
  IP | void,
  P & IP & { session: SP }
>;
export const createSessionProps = (session?: Session, filters?: string[]) => {
  if (!session) return undefined;
  const result: Session = {};
  for (const [key, value] of Object.entries(session))
    key !== "cookie" &&
      (!filters || filters.indexOf(key) === -1) &&
      (result[key] = value);
  return result;
};

let sessionProps:Session;
export const initProps = (app: App) => {
  const { Component, pageProps, session } = app.props as App["props"] & {
    session?: Session;
  };
  if(session)
      sessionProps = session;

    Component.defaultProps = {
      ...Component.defaultProps,
      ...pageProps,
      session:sessionProps
    };
};
