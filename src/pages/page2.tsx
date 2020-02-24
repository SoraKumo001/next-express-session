import Link from "next/link";
import { NextSessionPage } from "../libs/next-express-session";

interface Props {
  value2: number;
}

const Page: NextSessionPage<Props> = ({session:{ value2 }}) => {
  return (
    <>
      <Link href="/">
        <a>トップページへ</a>
      </Link>
      <div>Page2のページリロード回数:{value2||0}</div>
    </>
  );
};

Page.getInitialProps = async ({ session }) => {
  if (session) {
    //セッションデータの読み出し
    let { value2 } = session as { value2?: number };
    //データをインクリメント
    value2 = typeof value2 === "number" ? value2 + 1 : 1;
    //セッションデータの保存
    session.value2 = value2;
  }

};
export default Page;
