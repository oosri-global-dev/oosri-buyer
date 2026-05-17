import AccountLayout from "@/components/layouts/UserAccountLayout/account-layout";
import ProfileOverview from "./ProfileOverview/profile-overview";
import { useState } from "react";
import EditProfile from "./EditProfile/edit-profile";
import ChangePassword from "./ChangePassword/change-password";
import AddressBook from "./AddressBook/address-book";
import { useMainContext } from "@/context";

export default function ProfileScreen() {
  const [currentPage, setCurrentPage] = useState("Profile Overview");
  const { user, dispatch } = useMainContext();

  return (
    <AccountLayout>
      {currentPage === "Profile Overview" && (
        <ProfileOverview
          user={user}
          setCurrentPage={setCurrentPage}
          dispatch={dispatch}
        />
      )}
      {currentPage === "Edit Profile" && (
        <EditProfile
          setCurrentPage={setCurrentPage}
          user={user}
          dispatch={dispatch}
        />
      )}
      {currentPage === "Change Password" && (
        <ChangePassword
          setCurrentPage={setCurrentPage}
          user={user}
          dispatch={dispatch}
        />
      )}
      {currentPage === "Addresses" && (
        <AddressBook setCurrentPage={setCurrentPage} />
      )}
    </AccountLayout>
  );
}
