import React from 'react';
import logo from '../../assets/svg/logo.svg';

const Header = () => {
  return (
    <div className="w-full h-[62px] border-b-[1px] border-gray-100 grid grid-cols-3 items-center">
      <div></div>
      <div className="flex justify-center items-center gap-2">
        <img src={logo} alt="logo" className="w-16" />
        <span className="font-inter font-bold text-xl text-gray-600">momo</span>
      </div>

      {/* buttons */}
      <div className="flex justify-end gap-4 mr-4">
        <button className="w-16 h-8 shadow-md rounded-[6px] hover:bg-primary hover:text-white">Log in</button>
        <button className="w-16 h-8 bg-gray-600  shadow-md rounded-[6px] text-white hover:bg-primary">Join</button>
      </div>
    </div>
  );
};

export default Header;
