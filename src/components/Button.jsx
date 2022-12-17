const Button = ({ btnName, classStyle, handleClick, active }) => {

  return (
    <button
      type="submit"
      className={`text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-bold rounded-2xl nft-gradientuppercase text-white hover:bg-white
      ${classStyle} ${active}`}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
