import Link from "next/link";
import {
  NextSessionPage,
  createSessionProps
} from "../libs/next-express-session";

interface Props {
  value?: number;
}

const Page: NextSessionPage<Props> = ({ value }) => {
  return (
    <>
      <Link href="page2">
        <a>Page2へ</a>
      </Link>
      <div>ページリロード回数:{value}</div>
    </>
  );
};

Page.getInitialProps = async ({ session }) => {
  if (session) {
    const { value } = session;
    session.value = typeof value === "number" ? value + 1 : 1;
  }
  return createSessionProps(session);
};
export default Page;
