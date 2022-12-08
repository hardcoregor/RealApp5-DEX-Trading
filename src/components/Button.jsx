import { useState } from 'react';

const Button = ({ btnName, classStyle, handleClick }) => {

  return (
    <button
      type="submit"
      className={`text-base minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-bold rounded-2xl nft-gradient uppercase text-white ${classStyle}`}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
