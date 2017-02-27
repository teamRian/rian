import React, { Component } from 'react';
import moment from 'moment';
import '../../styles/Header.css';

export default class Header extends Component {

  render() {
  
    const today = moment().format('YYYY MMM Do');
  
    return (
      <div>
        <div classNam="backColor">
          <div className="col-xs-2">
            <span>Rian</span>
          </div>
          <div className="col-xs-5 alignRight">
            <svg width="20px" height="20px" viewBox="343 0 48 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <path d="M343,29.9097166 L343,2 C343,2 351.906567,-1.8260993 366.500574,2.8926758 C381.094582,7.6114497 391,0 391,0 L391,30.3730962 C391,30.3730962 384,37 366,33 C356.133596,30.8074659 348.139945,30.3757706 345,31.8060039 L345,60 L343,60 L343,29.9097166 L343,29.9097166 Z M366.5,5.2764401 C353.692714,1.2467703 345,3.7942699 345,3.7942699 L345,28.9911628 C345,28.9911628 347.106973,26.6490405 366.5,30.473333 C385.893027,34.2976257 389,28.9911633 389,28.9911633 L389,4 C389,4 379.307287,9.3061088 366.5,5.2764401 L366.5,5.2764401 Z" id="flag" stroke="none" fill="#929292 " fillRule="evenodd"></path>
            </svg>
          </div>
          <div className="col-xs-5 alignRight">
            <svg className="svgmargin" width="20px" height="20px" viewBox="206 355 42 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <path d="M214,356 L248,356 L248,358 L214,358 L214,356 L214,356 Z M214,367 L248,367 L248,369 L214,369 L214,367 L214,367 Z M214,378 L248,378 L248,380 L214,380 L214,378 L214,378 Z M206,355 L210,355 L210,359 L206,359 L206,355 L206,355 Z M206,366 L210,366 L210,370 L206,370 L206,366 L206,366 Z M206,377 L210,377 L210,381 L206,381 L206,377 L206,377 Z" id="menu" stroke="none" fill="#929292 " fillRule="evenodd"></path>
            </svg>
            <svg className="svgmargin" width="20px" height="20px" viewBox="155 123 67 68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <polygon id="previous" stroke="none" fill="#929292 " fillRule="evenodd" transform="translate(188.496136, 157.139113) rotate(45.000000) translate(-188.496136, -157.139113) " points="169.684661 180.472447 164.668267 180.472447 164.668267 133.80578 212.324005 133.80578 212.324005 138.80578 169.684661 138.80578"></polygon>
            </svg>
            <svg className="svgmargin" width="20px" height="20px" viewBox="3 88 67 68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <polygon id="next" stroke="none" fill="#929292 " fillRule="evenodd" transform="translate(36.503864, 121.860886) rotate(225.000000) translate(-36.503864, -121.860886) " points="12.675995 145.19422 12.675995 98.5275529 60.331733 98.5275529 60.331733 103.527553 17.6923884 103.527553 17.6923884 145.19422"></polygon>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
