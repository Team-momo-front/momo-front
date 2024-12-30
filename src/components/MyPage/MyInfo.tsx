import { useState } from 'react';
import { users } from '../../mocks/users';
import { User } from '../../types/User';
import UserInfo from './UserInfo';

const MyInfo = () => {
  // TODO: 서버에서 userData 받아오기
  const [userData, setUserData] = useState<User>(users[1]);
  const [isModified, setIsModified] = useState(false);

  const handleSubmit = () => {
    // TODO: 서버로 userData 전송
    console.log('Updated Data:', userData);
    setIsModified(false);
  };

  return (
    <div className="w-full">
      <div className="w-[680px] m-auto flex flex-col items-center mt-[50px]">
        <img
          src={
            userData.profileImage
              ? userData.profileImage
              : '../../../public/image/upload_profile_image.webp'
          }
          alt="user profile image"
          className={`w-[150px] h-[150px] object-cover rounded-full mb-[30px] ${
            userData.profileImage &&
            'bg-white p-[5px] border-[1px] border-gray-600'
          }`}
        />
        <UserInfo
          updatedUserData={userData}
          setUpdatedUserData={setUserData}
          isModified={isModified}
        />
        <div className="w-full flex justify-end my-10">
          {isModified ? (
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              저장
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsModified(true);
              }}
              className="btn btn-primary"
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
