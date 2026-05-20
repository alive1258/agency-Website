import {
  RiDribbbleLine,
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXLine,
} from "@remixicon/react";
import React from "react";

const ShareSocialLink = () => {
  return (
    <>
      <div className=" flex items-center space-x-3">
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
    </>
  );
};

export default ShareSocialLink;
