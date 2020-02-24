import Link from "next/link";
import { NextSessionPage } from "../libs/next-express-session";

interface SessionProps {
  value?: number;
}

const Page: NextSessionPage<SessionProps> = ({session:{ value }}) => {
  return (
    <>
      <Link href="page2">
        <a>Page2へ</a>
      </Link>
      <div>Indexのページリロード回数:{value||0}</div>
    </>
  );
};

Page.getInitialProps = async ({ session }) => {
  if (session) {
    //セッションデータの読み出し
    let { value } = session as { value?: number };
    //データをインクリメント
    value = typeof value === "number" ? value + 1 : 1;
    //セッションデータの保存(ここで設定したデータはdefaultPropsに保存される)
    session.value = value;
  }
};
export default Page;
