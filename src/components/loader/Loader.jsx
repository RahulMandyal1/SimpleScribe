import React from 'react';
import './loader.css';

const Loader = (props) => {
  const loaderDimensions = props.style ? props.style : 'h-[5vh]  min-h-[5vh]';
  return (
    <section
      data-testid='loader-container'
      className={`flex   w-full items-center justify-center ${loaderDimensions}`}
    >
      <div className='lds-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Loader;
