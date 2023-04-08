import Header from "@/components/Header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import NotificationsFeed from "@/components/NotificationsFeed";

const Notifications = () => {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
};
export default Notifications;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
