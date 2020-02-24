import {
  initializeSession,
  initProps,
  SessionType,
  createSessionProps
} from "../libs/next-express-session";
import NextApp, { AppContext, createUrl } from "next/app";
import expressSession from "express-session";
import fileStore from "session-file-store";

// express-sessionのオプション指定
const ExpressSessionOption = {
  secret: "secret",
  //サーバ上で動作している場合のみStoreの生成
  //ローカル実験用なので本稼働させるときはredisを推奨
  store: process.browser ? undefined : new (fileStore(expressSession))()
};

// セッション情報内からクライアントへ送りたくないデータを指定
const SessionFilter: string[] = [];

/**
 * Next.js Custom Session APP
 *
 * @export
 * @class App
 * @extends {NextApp}
 */
export default class App extends NextApp<{ session: SessionType }> {
  static async getInitialProps({
    ctx,
    Component: { getInitialProps }
  }: AppContext) {
    //セッション情報の初期化(SPA時にはundefined)
    const session = await initializeSession(ctx, ExpressSessionOption);
    const context = {
      ...ctx,
      session
    };
    //ページコンポーネント用pagePropsとセッションデータを送る
    //ここに設定したデータがSSRとSPAの初回レンダリング時に使用される
    return {
      pageProps: getInitialProps && (await getInitialProps(context)),
      session: createSessionProps(session, SessionFilter)
    };
  }
  render() {
    //セッション情報をdefaultPropsに設定し、二度目のSPAレンダリングでもデータを保持する
    initProps(this);
    const { router, Component, pageProps } = this.props;
    return <Component {...pageProps} url={createUrl(router)} />;
  }
}
