import Image from "next/image";

const portfolioImages = [
  { src: "/images/portfolio/frame1.png", alt: "feature1" },
  { src: "/images/portfolio/frame2.png", alt: "feature2" },
  { src: "/images/portfolio/frame3.png", alt: "feature3" },
];

const PortfolioGrid = () => {
  return (
    <div className="mt-24 container grid lg:grid-cols-2 grid-cols-1 gap-10">
      {/* First image full-width */}
      {portfolioImages[0] && (
        <div className="col-span-2">
          <Image
            className="object-cover w-full h-full  rounded-2xl"
            src={portfolioImages[0].src}
            alt={portfolioImages[0].alt}
            width={1000} // real image width in px
            height={1100} // real image height in px
            quality={90} // good balance of quality and size
            layout="responsive" // responsive layout with aspect ratio maintained
          />
        </div>
      )}

      {/* Remaining images in 2-column grid */}
      <div className="col-span-2 grid lg:grid-cols-2 grid-cols-1 gap-10">
        {portfolioImages.slice(1).map((image, idx) => (
          <Image
            key={idx}
            className="object-cover w-full h-full  rounded-2xl"
            src={image.src}
            alt={image.alt}
            width={500}
            height={400}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid;
