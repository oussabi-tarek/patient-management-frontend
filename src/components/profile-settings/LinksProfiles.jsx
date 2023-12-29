import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const links = [
  {
    text: "Parameters",
    route: "/Parameters",
  },
  {
    text: "Acceuil",
    route: "/",
  },
  {
    text: "Chat",
    route: "/chats",
  },
];
export default function LinksProfiles() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
      <div className="w-full overflow-x-scroll flex justify-around border-b border-darkGrey px-4 no-scrollbar">
        {links.map((link) => {
          return (
            <Link key={link.text} className="mx-2" to={link.route}>
              <div
                className={clsx("pb-2", {
                  "border-b-2 border-lightBlue": link.route === pathname,
                })}
              >
                <span
                  className={clsx(`font-medium text-base whitespace-nowrap`, {
                    "text-lightBlue": link.route === pathname,
                    "text-darkGrey":
                      link.route !== pathname,
                    "text-lighGrey": link.route !== pathname, 
                  })}
                >
                  {link.text}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
