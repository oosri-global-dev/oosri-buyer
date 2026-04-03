import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import ProfileScreen from "@/screens/Profile/profile";
import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile Page | Oosri</title>
      </Head>
      <ProfileScreen />
    </>
  );
};

ProfilePage.getLayout = (page) => <GeneralLayout isAuth={true}>{page}</GeneralLayout>;

export default ProfilePage;
