import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const links = [
  {
    text: "Settings",
    route: "Settings",
    isDisabled: false,
  },
  {
    text: "Rendez vous",
    route: "",
    isDisabled: true,
  },
  {
    text: "Chat",
    route: "",
    isDisabled: true,
  },
  {
    text: "History" ,
    route: "",
    isDisabled: true,
  },
  {
    text: "Guide",
    route: "",
    isDisabled: true,
  },
];
export default function LinksProfiles() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
      <div className="w-full overflow-x-scroll flex justify-between border-b border-darkGrey px-4 no-scrollbar">
        {links.map((link) => {
          return (
            <Link key={link.text} className="mx-2" href="#">
              <div
                className={clsx("pb-2", {
                  "border-b-2 border-lightBlue": link.route === pathname,
                  "cursor-not-allowed": link.isDisabled,
                })}
              >
                <span
                  className={clsx(`font-medium text-base whitespace-nowrap`, {
                    "text-lightBlue": link.route === pathname,
                    "text-darkGrey":
                      link.route !== pathname && !link.isDisabled,
                    "text-lighGrey": link.route !== pathname && link.isDisabled,
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
