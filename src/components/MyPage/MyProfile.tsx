import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useFetchUserProfile from '../../hooks/useFetchUserProfile';
import { isFormInvalidFormState } from '../../states/recoilState';
import LoadingSpinner from '../LoadingSpinner';
import ProfileImageUpload from '../ProfileImageUpload';
import InfoForm from './InfoForm';
import ProfileRedirect from './ProfileRedirect';

const MyProfile = () => {
  const { data, isLoading } = useFetchUserProfile();

  const [isModified, setIsModified] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(
    data?.profileImageUrl ?? null
  );
  const [hasProfile, setHasProfile] = useState<string | null>(
    localStorage.getItem('hasProfile')
  );

  const isInvalidUserForm = useRecoilValue(isFormInvalidFormState);

  useEffect(() => {
    if (data) {
      setHasProfile(localStorage.getItem('hasProfile'));
    }
  }, [data]);

  const handleSubmit = () => {
    // TODO: 프로필 수정 API 호출
    setIsModified(false);
    setIsCanceled(false);
  };

  const handleCancel = () => {
    setProfileImage(null);
    setIsModified(false);
    setIsCanceled(true);
  };

  const handleProfileImageChange = useCallback((newImageURL: string | null) => {
    setProfileImageURL(newImageURL);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center font-bold text-3xl">
        <LoadingSpinner />
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
            src={data?.profileImageUrl || '/image/upload_profile_image.webp'}
            alt="user profile image"
            className={`w-[150px] h-[150px] object-cover rounded-full mb-[30px] ${
              data?.profileImageUrl &&
              'bg-white p-[5px] border-[1px] border-gray-600'
            }`}
          />
        )}

        {data && (
          <InfoForm
            isModified={isModified}
            isCanceled={isCanceled}
            profileData={data}
          />
        )}
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
