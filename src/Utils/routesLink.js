import React from "react";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded";
import ContactPhoneRoundedIcon from "@material-ui/icons/ContactPhoneRounded";
import ShopTwoRoundedIcon from "@material-ui/icons/ShopTwoRounded";

const routes = [
  { path: "/", label: "Home", icon: <HomeRoundedIcon /> },
  { path: "/about", label: "About", icon: <ImportContactsRoundedIcon /> },
  { path: "/contact", label: "Contact", icon: <ContactPhoneRoundedIcon /> },
  { path: "/shop", label: "Shop", icon: <ShopTwoRoundedIcon /> },
];

export default routes;
