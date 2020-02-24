import {
  initialSession,
  initProps,
  Session,
  createSessionProps
} from "../libs/next-express-session";
import App, { AppContext, createUrl } from "next/app";
import session from "express-session";


const ExpressSessionOption = {
  secret: "secret",
};
const SessionNameFilter:string[] = [];

/**
 * Next.js Custom Sesson APP
 *
 * @export
 * @class SessionApp
 * @extends {App}
 */
export default class SessionApp extends App<{ session: Session }> {
  static async getInitialProps({
    ctx,
    Component: { getInitialProps }
  }: AppContext) {
    const session = await initialSession(ctx, ExpressSessionOption);
    const context = {
      ...ctx,
      session
    };
    return {
      pageProps: getInitialProps && (await getInitialProps(context)),
      session: createSessionProps(session,SessionNameFilter)
    };
  }
  render() {
    initProps(this);
    const { router, Component, pageProps } = this.props;
    return <Component {...pageProps} url={createUrl(router)} />;
  }
}
