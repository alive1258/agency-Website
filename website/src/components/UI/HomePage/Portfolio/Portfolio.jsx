"use client";
import React, { useState } from "react";
import BadgeLabel from "../../BadgeLabel/BadgeLabel";
import Button from "../../Button/Button";
import PortfolioCard from "./PortfolioCard";
import SlideUp from "@/utils/animations/SlideUp";
import { caseStudiesData } from "@/utils/fakeData/caseStudiesData";
import { portfolioCategories } from "@/utils/fakeData/portfolioCategories";
import Link from "next/link";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // FILTERING CASE STUDIES BASED ON SELECTED CATEGORY
  const filteredData =
    selectedCategory === "All"
      ? caseStudiesData
      : caseStudiesData.filter((item) => item.category === selectedCategory);

  return (
    <section className="container md:my-14 my-20">
      {/* START HEADER SECTION  */}
      <BadgeLabel text="Portfolio" />

      <SlideUp>
        <h1 className="animated-header">Our Work Speaks for Itself</h1>
      </SlideUp>
      <SlideUp>
        <p className="primary-paragraph">
          We help brands elevate their digital presence through cutting-edge
          design and technology.
        </p>
      </SlideUp>
      {/* END HEADER SECTION  */}

      {/* START CATEGORY FILTER BUTTONS */}
      <div className="my-10 flex justify-center flex-wrap gap-3">
        {portfolioCategories?.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`border cursor-pointer text-sm rounded-3xl px-6 py-2 font-medium transition-all duration-300 ease-in-out ${
              selectedCategory === cat
                ? "text-white-base bg-[#3B82F6] border-[#3B82F6]"
                : "text-tertiary-base border-[#71717A] hover:text-[#3B82F6] hover:border-[#3B82F6]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* END CATEGORY FILTER BUTTONS */}

      {/* START FILTERED PORTFOLIO CARD LIST */}
      <div>
        {filteredData?.slice(0, 5)?.map((item, idx) => (
          <PortfolioCard
            item={item}
            idx={idx}
            key={`${item.id}-${selectedCategory}`}
            delay={idx * 0.3}
          />
        ))}
      </div>
      {/* END FILTERED PORTFOLIO CARD LIST */}

      <SlideUp className="pt-10 flex justify-center uppercase">
        <Link href="/portfolio">
          <Button content="View More Case Studies" />
        </Link>
      </SlideUp>
    </section>
  );
};

export default Portfolio;
