import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useFetchUserProfile from '../../hooks/useFetchUserProfile';
import {
  isFormInvalidFormState,
  updatedUserDataState,
} from '../../states/recoilState';
import LoadingSpinner from '../LoadingSpinner';
import ProfileImageUpload from '../ProfileImageUpload';
import InfoForm from './InfoForm';
import ProfileRedirect from './ProfileRedirect';
import useEditProfile from '../../hooks/useEditProfile';

const MyProfile = () => {
  const { data, isLoading, refetch } = useFetchUserProfile();
  const [isModified, setIsModified] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(
    data?.profileImageUrl ?? null
  );
  const isInvalidUserForm = useRecoilValue(isFormInvalidFormState);
  const [updatedUserData, setUpdatedUserData] =
    useRecoilState(updatedUserDataState);

  useEffect(() => {
    if (data) {
      setProfileImageURL(data.profileImageUrl);
    }
  }, [data]);

  const hasProfile = localStorage.getItem('hasProfile');

  const { mutate, isPending } = useEditProfile();

  // TODO: 서버 DB 업데이트 이슈 수정 후 테스트 필요
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    mutate(updatedUserData, {
      onSuccess: async data => {
        console.log(data);
        await refetch();
      },
      onError: error => {
        console.log(error);
        alert('오류 발생: 프로필 수정에 실패하였습니다.');
      },
    });
    setIsModified(false);
    setIsCanceled(false);
    setUpdatedUserData({});
  };

  const handleCancel = () => {
    setProfileImage(null);
    setIsModified(false);
    setIsCanceled(true);

    if (data) {
      setProfileImageURL(data.profileImageUrl);
    }
    setUpdatedUserData({});
  };

  const handleProfileImageChange = useCallback((newImageURL: string | null) => {
    setProfileImageURL(newImageURL);

    if (newImageURL) {
      setUpdatedUserData(prevData => ({
        ...prevData,
        profileImageUrl: newImageURL,
      }));
    }
  }, []);

  // TODO: 백엔드 오류 코드 오류 수정 후 서버 재배포 예정, TEST 필요
  if (hasProfile === 'false') {
    return <ProfileRedirect />;
  }

  if (isLoading || isPending) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center font-bold text-3xl">
        <LoadingSpinner />
      </div>
    );
  }

  return hasProfile === 'true' && data ? (
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

        <InfoForm
          isModified={isModified}
          isCanceled={isCanceled}
          profileData={data}
        />

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
                onClick={e => handleSubmit(e)}
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
