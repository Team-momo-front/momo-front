import { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import InfoForm from './InfoForm';
import ProfileImageUpload from '../ProfileImageUpload';
import {
  isFormInvalidFormState,
  initialUserDataState,
  updatedUserDataState,
} from '../../states/recoilState';
import ProfileRedirect from './ProfileRedirect';
import useFetchUserProfile from '../../hooks/useFetchUserProfile';

const MyProfile = () => {
  // 서버로부터 유저 프로필데이터 받아오기
  const { data, isLoading } = useFetchUserProfile();

  const [initialUserData, setInitialUserData] =
    useRecoilState(initialUserDataState);
  const [updatedUserData, setUpdatedUserData] =
    useRecoilState(updatedUserDataState);
  const [isModified, setIsModified] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(
    initialUserData.profileImageUrl ?? null
  );
  const [hasProfile, setHasProfile] = useState<string | null>(
    localStorage.getItem('hasProfile')
  );

  const isInvalidUserForm = useRecoilValue(isFormInvalidFormState);

  useEffect(() => {
    if (data) {
      const processedData = {
        ...data,
        mbti: data.mbti === 'NONE' ? '' : data.mbti,
      };

      localStorage.setItem('hasProfile', 'true');
      setHasProfile(localStorage.getItem('hasProfile'));

      setInitialUserData(processedData);
      setUpdatedUserData(processedData);
      setProfileImageURL(data.profileImageUrl ?? null);
    }
  }, [data, setInitialUserData, setUpdatedUserData]);

  const handleSubmit = () => {
    // TODO: 서버로 userData 전송
    setInitialUserData(updatedUserData);
    console.log('submit', updatedUserData);
    setIsModified(false);
    setIsCanceled(false);
  };

  const handleCancel = () => {
    setUpdatedUserData(initialUserData);
    setProfileImageURL(initialUserData.profileImageUrl ?? null);
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

  if (isLoading) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center font-bold text-3xl">
        <span className="loading loading-spinner w-14 text-gray-600"></span>
      </div>
    );
  }

  if (hasProfile === 'false') {
    return <ProfileRedirect />;
  }

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
              initialUserData.profileImageUrl ||
              '/image/upload_profile_image.webp'
            }
            alt="user profile image"
            className={`w-[150px] h-[150px] object-cover rounded-full mb-[30px] ${
              initialUserData.profileImageUrl &&
              'bg-white p-[5px] border-[1px] border-gray-600'
            }`}
          />
        )}

        <InfoForm isModified={isModified} isCanceled={isCanceled} />
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
    <></>
  );
};

export default MyProfile;
