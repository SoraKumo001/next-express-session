import Link from "next/link";
import { NextSessionPage, createSessionProps, initProps } from "../libs/next-session";

interface Props {
  value?: number;
}

const Page: NextSessionPage<Props> = ({ session, value }) => {
  initProps(Page,session)
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
    const value = typeof session.value === "number" ? session.value + 1 : 1;
    session.value = value;
  }
  return createSessionProps(session);
};
export default Page;
