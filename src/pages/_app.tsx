import { initialSession, initProps } from "../libs/next-express-session";
import App, { AppContext, createUrl } from "next/app";

const ExpressSessionOption = {
  secret: "secret"
};

/**
 * Next.js Custom Sesson APP
 *
 * @export
 * @class SessionApp
 * @extends {App}
 */
export default class SessionApp extends App {
  static async getInitialProps({
    ctx,
    Component: { getInitialProps }
  }: AppContext) {
    const context = {
      ...ctx,
      session: await initialSession(ctx, ExpressSessionOption)
    };
    return {
      pageProps: getInitialProps && (await getInitialProps(context))
    };
  }
  render() {
    const { router, Component, pageProps } = this.props;
    initProps(Component, pageProps);
    return <Component {...pageProps} url={createUrl(router)} />;
  }
}
