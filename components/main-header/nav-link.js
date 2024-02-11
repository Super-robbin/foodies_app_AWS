"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

const NavLink = ({ href, children }) => {
  // usePathname() allows us to check the current path so we can dynamically set the className,
  // depending on whether is active or not (remember 'use client' at the top of the file)

  // IMPORTANT: initially we did this in the MainHeader, but you typically wanna add use client
  // as far down the component tree as possible so that you really only turn the components
  // that need to be converted to client components into client components
  // so that the majority of your components can stay server components and are rendered on the server
  // so you don't lose those server component advantagesfor most of your components.

  // Therefore we created a NavLink component and made it dynamic.
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
