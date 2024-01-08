import AccountLayout from "@/components/layouts/UserAccountLayout/account-layout";
import ProfileOverview from "./ProfileOverview/profile-overview";
import { useState } from "react";
import EditProfile from "./EditProfile/edit-profile";
import ChangePassword from "./ChangePassword/change-password";

export default function ProfileScreen() {
  const [currentPage, setCurrentPage] = useState("Profile Overview");
  return (
    <AccountLayout>
      {currentPage === "Profile Overview" && (
        <ProfileOverview setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "Edit Profile" && (
        <EditProfile setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "Change Password" && (
        <ChangePassword setCurrentPage={setCurrentPage} />
      )}
    </AccountLayout>
  );
}
