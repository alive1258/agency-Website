"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../UI/Button/Button";
import {
  RiArrowDownSLine,
  RiArrowUpLine,
  RiCloseLine,
  RiDribbbleLine,
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiMenuLine,
  RiTwitterXLine,
} from "@remixicon/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);

  const isServicesOpen = openModal === "services";
  const isPageOpen = openModal === "page";
  const isPortfolioOpen = openModal === "portfolio";
  const isBlogOpen = openModal === "blog";

  const toggleModal = (modalName) => {
    setOpenModal((prev) => (prev === modalName ? "" : modalName));
  };

  const closeSidebar = () => setOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleMenuLinkClick = () => {
    setOpenModal("");
    closeSidebar();
    scrollToTop();
  };

  const toggleSidebar = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scroll = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollPercent(Math.round(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 w-full z-[500] bg-white-base shadow-sm transition-all duration-500 ease-in-out `}
      >
        <div className="max-w-[1440px]  uppercase mx-auto w-full md:px-6 px-5 flex items-center justify-between  h-[96px] text-[#18181B] text-[16px] ">
          {/* START LOGO DESIGN AREA  */}
          <Link href="/">
            <Image
              className="w-[125px] h-10"
              src={"/images/logo/LogoSolvex.svg"}
              height={40}
              width={125}
              alt="logo"
            />
          </Link>
          {/* / END LOGO DESIGN AREA */}

          {/*  START HAMBURGER BUTTON FOR MOBILE  */}
          <button
            className="md:hidden  focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            {!open ? (
              <RiMenuLine size={30} />
            ) : (
              <div className="border size-8  rounded-full flex items-center justify-center">
                <RiCloseLine size={30} />
              </div>
            )}
          </button>
          {/* / END HAMBURGER BUTTON FOR MOBILE  */}

          {/* START NAV DESIGN AREA  */}
          <ul
            className={`${
              open
                ? "left-0 top-0 z-50  bg-white-base"
                : "-left-full top-0  z-50 bg-white-base"
            }  md:static  md:mt-0 mt-24 absolute w-full md:w-auto h-screen md:h-auto bg-white-base  flex flex-col md:flex-row md:items-center gap-y-4 gap-x-12 transition-all duration-500 ease-in-out`}
          >
            {/* Main Menu  */}

            {/* Home */}
            <li className="nav-menu group">
              <Link href="/">Home</Link>
            </li>

            {/* Services */}
            <li className="nav-menu group">
              <button
                type="button"
                className="menu"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Services
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Sub-menu  */}
              <div className="sub-menu">
                <ul className="bg-white mt-10 shadow-2xl rounded-md">
                  <li className="menu-item">
                    <Link href="/service">Service</Link>
                  </li>
                  <li className="menu-item border-transparent">
                    <Link href="/service-details">Service Details</Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Page */}
            <li className="nav-menu group">
              <button
                type="button"
                className="menu"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Page
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Sub-menu  */}
              <div className="sub-menu">
                <ul className="bg-white mt-10 shadow-2xl rounded-md">
                  <li className="menu-item">
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/team">Team</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/team-details">Team Details</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/pricing">Pricing</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/career">Career</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/career-details">Career Details</Link>
                  </li>
                  <li className="menu-item border-transparent">
                    <Link href="/faqs">Faqs</Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Portfolio */}
            <li className="nav-menu group">
              <button
                type="button"
                className="menu"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Portfolio
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Sub-menu  */}
              <div className="sub-menu">
                <ul className="bg-white mt-10 shadow-2xl rounded-md">
                  <li className="menu-item">
                    <Link href="/portfolio">Portfolio </Link>
                  </li>
                  <li className="menu-item border-transparent">
                    <Link href="/portfolio-details">Portfolio Details</Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Blog */}
            <li className="nav-menu group">
              <button
                type="button"
                className="menu"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Blog
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Sub-menu  */}
              <div className="sub-menu">
                <ul className="bg-white mt-10 shadow-2xl rounded-md">
                  <li className="menu-item">
                    <Link href="/blog-grid">Blog Gird</Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/blog-list">Blog List</Link>
                  </li>
                  <li className="menu-item border-transparent">
                    <Link href="/blog-details">Blog Details</Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* MOBILE MENU START  */}
            <li className=" pt-14 md:hidden ">
              <div className="mobile-nav-menu">
                <Link onClick={handleMenuLinkClick} href="/">
                  Home
                </Link>
              </div>
            </li>

            {/* Mobile Menu Services  */}
            <li className="md:hidden">
              {/* Button for toggling the services dropdown in mobile view */}
              <div
                onClick={() => toggleModal("services")}
                className="mobile-nav-menu"
              >
                <button
                  type="button"
                  className="uppercase"
                  aria-haspopup="true"
                  aria-label="Toggle Services"
                >
                  Services
                </button>
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </div>

              {/* Dropdown list with mobile-specific styles */}
              <ul
                className={`overflow-hidden mx-8 transition-all duration-300 delay-150 ease-in-out ${
                  isServicesOpen
                    ? "max-h-[500px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                {/* Dropdown items container */}
                <div className="bg-white shadow-2xl rounded-md">
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/service">
                      Service
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/service-details">
                      Service Details
                    </Link>
                  </li>
                </div>
              </ul>
            </li>

            {/* Mobile Menu Page   */}
            <li className=" md:hidden ">
              <div
                onClick={() => toggleModal("page")}
                className="mobile-nav-menu"
              >
                <button
                  type="button"
                  className="uppercase"
                  aria-haspopup="true"
                  aria-label="Toggle Page"
                >
                  Page
                </button>
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </div>

              <ul
                className={`overflow-hidden mx-8 transition-all duration-300 delay-150  ease-in-out ${
                  isPageOpen
                    ? "max-h-[500px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white shadow-2xl">
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/about-us">
                      About Us
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/team">
                      Team
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/team-details">
                      Team Details
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/pricing">
                      Pricing
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/career">
                      Career
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/career-details">
                      Career Details
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/faqs">
                      Faqs
                    </Link>
                  </li>
                </div>
              </ul>
            </li>
            {/* Mobile Menu Portfolio   */}
            <li className="md:hidden">
              <div
                onClick={() => toggleModal("portfolio")}
                className="mobile-nav-menu"
              >
                <button
                  type="button"
                  className="uppercase"
                  aria-haspopup="true"
                  aria-label="Toggle portfolio"
                >
                  Portfolio
                </button>
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </div>

              <ul
                className={`overflow-hidden mx-8 transition-all duration-300 delay-150  ease-in-out ${
                  isPortfolioOpen
                    ? "max-h-[500px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white shadow-2xl">
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/portfolio">
                      Portfolio{" "}
                    </Link>
                  </li>
                  <li className=" mobile-sub-menu-link">
                    <Link
                      onClick={handleMenuLinkClick}
                      href="/portfolio-details"
                    >
                      Portfolio Details
                    </Link>
                  </li>
                </div>
              </ul>
            </li>
            {/* Mobile Menu Blog   */}
            <li className="md:hidden  ">
              <div
                onClick={() => toggleModal("blog")}
                className="mobile-nav-menu"
              >
                <button
                  type="button"
                  className="uppercase"
                  aria-haspopup="true"
                  aria-label="Toggle blog"
                >
                  Blog
                </button>
                <RiArrowDownSLine
                  size={20}
                  className="arrow-down-icon"
                  aria-hidden="true"
                />
              </div>

              <ul
                className={`overflow-hidden mx-8 transition-all duration-300 delay-150  ease-in-out ${
                  isBlogOpen
                    ? "max-h-[500px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className={`
                    
                    bg-white shadow-2xl`}
                >
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/blog-grid">
                      Blog Gird
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/blog-list">
                      Blog List
                    </Link>
                  </li>
                  <li className="mobile-sub-menu-link">
                    <Link onClick={handleMenuLinkClick} href="/blog-details">
                      Blog Details
                    </Link>
                  </li>
                </div>
              </ul>
            </li>

            {/* Mobile Menu Contact   */}
            <li>
              <Link
                onClick={handleMenuLinkClick}
                href="/contact"
                className={`block px-5 nav-menu py-2  transition-colors duration-300 `}
              >
                Contact
              </Link>
            </li>
            <li className="mt-4 md:inline-block hidden  md:mt-0">
              <Link href="/contact">
                <Button content="Get a Free Consultation" />
              </Link>
            </li>

            {/* START MOBILE MENU SOCIAL LINK   */}
            <li className="mt-8 mx-5 inline-block md:hidden md:mt-0 border-b pb-3 border-border-base">
              <span>Follow Us</span>
            </li>

            <div className="mt-6 px-5  md:hidden flex items-center space-x-3">
              <div className="team-social-icon group">
                <RiFacebookFill
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiInstagramLine
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiLinkedinFill
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiTwitterXLine
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
              <div className="team-social-icon group">
                <RiDribbbleLine
                  className="text-gray-500 group-hover:text-white"
                  size={20}
                />
              </div>
            </div>
            {/* / END MOBILE MENU   */}
          </ul>
        </div>

        {/* scroll Percent section    */}
        <div className="hidden lg:flex fixed flex-col right-0  mr-4 bottom-4">
          <div className="space-y-4 relative">
            <div
              className={`absolute right-0 mr-4 bottom-0 transition-opacity duration-500 ${
                scrollPercent === 100
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <div
                className="group relative size-14 rounded-full flex justify-center items-center border-2 border-border-base bg-white"
                style={{
                  background: `conic-gradient(#3B82F6 ${
                    scrollPercent * 3.6
                  }deg, #E4E4E7 ${scrollPercent * 3.6}deg)`,
                }}
              >
                {/* Inner Circle with Percentage */}
                <div className="size-11 bg-white rounded-full flex items-center justify-center text-sm  text-[#3B82F6]">
                  {scrollPercent}%
                </div>

                {/* Scroll to top button (only visible on hover) */}
                <button
                  aria-label="Scroll to top"
                  onClick={scrollToTop}
                  className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full hover:bg-[#3B82F6] hover:border-[#3B82F6] cursor-pointer"
                >
                  <RiArrowUpLine className="text-white" size={28} />
                </button>
              </div>
            </div>

            {/* Scroll to top button */}
            <div
              onClick={scrollToTop}
              className={`absolute right-0  mr-4 bottom-4 bg-white size-14 ml-2 border-4 transition-all duration-500 ease-in-out group cursor-pointer hover:bg-[#3B82F6] hover:border-[#3B82F6] rounded-full flex justify-center items-center border-[#3B82F6] ${
                scrollPercent === 100
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <RiArrowUpLine
                className="text-[#3B82F6] group-hover:text-white"
                size={28}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
