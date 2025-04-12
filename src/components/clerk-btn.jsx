"use client";

import { useClerk } from "@clerk/nextjs";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const ClerkBtn = ({ event, name, icon }) => {
  const { openUserProfile, signOut } = useClerk();

  const handleClick = () => {
    if (event === "setting") {
      openUserProfile();
    } else if (event === "logout") {
      signOut({ redirectUrl: "/" });
    }
  };

  return (
    <DropdownMenuItem onClick={handleClick}>
      {icon}
      {name}
    </DropdownMenuItem>
  );
};
export default ClerkBtn;
