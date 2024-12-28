import logo from '../../assets/svg/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="w-full h-[62px] border-b-[1px] border-gray-100 grid grid-cols-3 items-center">
      <div></div>
      <div className="flex justify-center items-center gap-2">
        <img src={logo} alt="logo" className="w-16" />
        <span className="font-inter font-bold text-xl text-gray-600">momo</span>
      </div>

      {/* buttons */}
      <div className="flex justify-end gap-3 mr-4">
        <Link to="/login">
          <button className="btn btn-sm font-inter font-medium">Login</button>
          {/* <button className="w-16 h-8 shadow-md rounded-md font-inter hover:bg-primary hover:text-white">Log in</button> */}
        </Link>
        <Link to="/join">
          <button className="btn btn-sm font-inter font-medium">
            {/* <button className="w-16 h-8 bg-gray-600 shadow-md rounded-md font-inter text-white hover:bg-primary"> */}
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
