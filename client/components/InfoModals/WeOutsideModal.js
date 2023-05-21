import React from "react";
import '../../../public/styles/weOutside.css'

const WeOutsideModal = () => {
  return (
    <>
      <div className="ModalView">
        <div className="info-icon">&#9432;</div> 
        <h1>We Outside</h1>
        <p className="italic">[ phrase ]</p>
         <div>
        <p className="bold">1. A catchphrase in NYC, popularized by urban youth culture, and embraced by individuals seeking an active and adventurous lifestyle.</p>
        <p>Example usage:
        <br/>
        "Oh you wanna know where I'm at? We Outside!"</p>
      </div>
      <div>
        <p>
          "We Outside" is your gateway to NYC's food scene! Browse nearby restaurants, check out their profiles, and share your experiences by leaving reviews. It's your interactive guide to explore, connect, and savor the city's culinary delights.
        </p>
      </div>
      </div>
    </>
  );
};

export default WeOutsideModal;