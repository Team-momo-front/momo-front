import { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { users } from '../../mocks/users';
// import { User } from '../../types/User';
import UserInfo from './MyInfo';
import ProfileImageUpload from '../ProfileImageUpload';
import {
  isFormInvalidFormState,
  initialUserDataState,
  updatedUserDataState,
} from '../../states/recoilState';
import axiosInstance from '../../api/axiosInstance';
import { AxiosError } from 'axios';
import ProfileRedirect from './ProfileRedirect';

const MyInfo = () => {
  // TODO: 서버에서 데이터 받아 전역상태관리 필요
  const [initialUserData, setInitialUserData] =
    useRecoilState(initialUserDataState);
  const [updatedUserData, setUpdatedUserData] =
    useRecoilState(updatedUserDataState);

  const [isModified, setIsModified] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(
    initialUserData.profileImage ?? null
  );

  const isInvalidUserForm = useRecoilValue(isFormInvalidFormState);
  const hasProfile = localStorage.getItem('hasProfile');

  // TODO: 서버에서 유저 데이터 받아서 초기값 셋팅
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/users/me');
        console.log(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response && err.response.data.code === 'PROFILE_REQUIRED') {
          }
        }
      }
    };

    fetchUserData();
  }, []);

  // useEffect(() => {
  //   setInitialUserData(users[1]);
  //   setUpdatedUserData(users[1]);
  //   setProfileImageURL(users[1].profileImage ?? null);
  // }, []);

  const handleSubmit = () => {
    // TODO: 서버로 userData 전송
    setInitialUserData(updatedUserData);
    console.log('submit', updatedUserData);
    setIsModified(false);
    setIsCanceled(false);
  };

  const handleCancel = () => {
    setUpdatedUserData(initialUserData);
    setProfileImageURL(initialUserData.profileImage ?? null);
    setProfileImage(null);
    setIsModified(false);
    setIsCanceled(true);
  };

  const handleProfileImageChange = useCallback((newImageURL: string | null) => {
    setProfileImageURL(newImageURL);

    if (newImageURL) {
      setUpdatedUserData(prevData => ({
        ...prevData,
        profileImage: newImageURL,
      }));
    }
  }, []);

  return hasProfile === 'true' ? (
    <div className="w-full">
      <div className="w-[680px] m-auto flex flex-col items-center mt-[30px]">
        {isModified ? (
          <div className="mb-[30px]">
            <ProfileImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              defaultImage="/image/default_profile_image.webp"
              profileURL={profileImageURL}
              onProfileImageChange={handleProfileImageChange}
            />
          </div>
        ) : (
          <img
            src={
              initialUserData.profileImage || '/image/upload_profile_image.webp'
            }
            alt="user profile image"
            className={`w-[150px] h-[150px] object-cover rounded-full mb-[30px] ${
              initialUserData.profileImage &&
              'bg-white p-[5px] border-[1px] border-gray-600'
            }`}
          />
        )}

        <UserInfo isModified={isModified} isCanceled={isCanceled} />
        <div className="w-full flex justify-end my-10">
          {isModified ? (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-second"
              >
                취소
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary disabled:border-none"
                disabled={!!isInvalidUserForm}
              >
                저장
              </button>
            </div>
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
  ) : (
    <>
      <ProfileRedirect />
    </>
  );
};

export default MyInfo;
