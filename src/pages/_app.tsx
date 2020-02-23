import { initialSession } from "../libs/next-session";
import App, { AppContext, createUrl } from "next/app";
export default class _App extends App {
  static async getInitialProps({ ctx, Component:{getInitialProps} }: AppContext) {
    const context = { ...ctx, session:await initialSession(ctx) };
    return {
      pageProps:
        getInitialProps && (await getInitialProps(context))
    };
  }
  render() {
    const { router, Component, pageProps } = this.props;
    return <Component {...pageProps} url={createUrl(router)} />;
  }
}
