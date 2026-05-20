import Button from "@/components/UI/Button/Button";
import { relatedProjects } from "@/utils/fakeData/relatedProjects";
import Image from "next/image";
import React from "react";
import RelatedProductCard from "./RelatedProductCard";

const RelatedProduct = () => {
  return (
    <div className="mt-14 bg-[#18181B]">
      <div className="container py-16">
        <div className="md:flex items-center justify-between ">
          <h1 className="text-[32px] text-[#D4D4D8]  font-satoshi font-bold">
            Related Product
          </h1>
          <div className=" uppercase">
            <Button content="view all products" />
          </div>
        </div>
        <div
          className="mt-6 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, #818181 -0.2%, rgba(0, 0, 0, 0.00) 101.03%)",
          }}
        ></div>

        <div className="mt-12 md:flex items-center justify-center space-x-6">
          {relatedProjects?.map((project, index) => (
            <RelatedProductCard
              project={project}
              delay={index * 0.4}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
