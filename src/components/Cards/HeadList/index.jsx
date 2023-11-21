// import { Fragment } from "react";
import React from "react";
import HeadlistCard from "./HeadlistCard";

const HeadLeaderList = ({ books = [], lastBookElementRef }) => {
   books = [...new Set(books)];
   return (
      <div className="items lead-section">
         <div className="leaderscoreboard">
            {/* {startIndex !== 0 && ( */}
            <div className="uparw">
               <img src="assets/images/top-arrow.png" alt="" />
            </div>
            {/* )} */}

            <div className="row">
               {books?.map((item, index) => {
                  if (books.length === index + 1)
                     return (
                        <div
                           className="UserVs"
                           key={`${index}-leader`}
                           ref={lastBookElementRef}
                        >
                           <HeadlistCard
                              name={item.leftHandle}
                              rank={item.leftRank}
                              roi={item.leftROI}
                              avatar={item.leftAvatar}
                              boardColor={item.leftColor}
                           />

                           <div className="premium-vs">
                              <span>vs</span>
                           </div>

                           <HeadlistCard
                              color="red-brd"
                              name={item.rightHandle}
                              rank={item.rightRank}
                              roi={item.rightROI}
                              avatar={item.rightAvatar}
                              boardColor={item.rightColor}
                           />
                        </div>
                     );
                  else
                     return (
                        <div className="UserVs" key={`${index}-leader`}>
                           <HeadlistCard
                              name={item.leftHandle}
                              rank={item.leftRank}
                              roi={item.leftROI}
                              avatar={item.leftAvatar}
                              boardColor={item.leftColor}
                           />

                           <div className="premium-vs">
                              <span>vs</span>
                           </div>

                           <HeadlistCard
                              color="red-brd"
                              name={item.rightHandle}
                              rank={item.rightRank}
                              roi={item.rightROI}
                              avatar={item.rightAvatar}
                              boardColor={item.rightColor}
                           />
                        </div>
                     );
               })}
            </div>
            {/* {showLast && ( */}
            <div className="downarw">
               <img src="assets/images/bottom-arrow.png" alt="" />
            </div>
            {/* )} */}
         </div>
      </div>
   );
};

export default HeadLeaderList;
