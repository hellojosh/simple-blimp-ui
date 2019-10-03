import React from 'react';

import image from '../images/404.png';

export default function FourZeroFour() {
  return (
    <div className="container-lg px-3 py-5 mx-auto text-center">
      <img src={image} className="d-block col-12 col-sm-9 col-md-6 col-lg-4 mx-auto mb-3" alt="The page has been abducted" />
      <p className="f2 mb-3">Page Not Found</p>
    </div>
  );
}
