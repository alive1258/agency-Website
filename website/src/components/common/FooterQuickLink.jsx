import React from "react";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { footerLinks } from "@/utils/fakeData/footerLinks";

const FooterQuickLink = () => {
  return (
    <section>
      <div className="md:col-span-1 mt-10 md:mt-0">
        {/* ========== SECTION TITLE START ========== */}
        <h2 className="text-[#FAFAFA] font-satoshi font-bold text-lg border-b border-[#3B82F6] pb-1 uppercase w-3/4">
          Quick Links
        </h2>
        {/* ========== SECTION TITLE END ========== */}

        {/* ========== QUICK LINKS LIST START ========== */}
        <ul className="mt-10 space-y-4">
          {footerLinks?.map((link, index) => (
            <li
              key={index}
              className="group flex items-center gap-2 cursor-pointer"
            >
              {/* ICON */}
              <RiArrowRightLine
                size={18}
                className="fill-[#D4D4D8] group-hover:fill-[#3B82F6] transition-transform duration-300 ease-in-out group-hover:translate-x-1"
              />
              {/* LINK TEXT */}
              <Link
                href={link?.href}
                className="text-[#D4D4D8] group-hover:text-[#3B82F6] text-[16px] "
              >
                {link?.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* ========== QUICK LINKS LIST END ========== */}
      </div>
    </section>
  );
};

export default FooterQuickLink;
