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
  const {
    data: profileData,
    isLoading: fetchProfileDataIsLoading,
    isError: fetchProfileDataIsError,
    refetch,
    error,
  } = useFetchUserProfile();

  // 프로필 검증
  if (error) {
    if (error.response && error.response.status === 403) {
      localStorage.setItem('hasProfile', 'false');
    }
  }

  const [isModified, setIsModified] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const isInvalidUserForm = useRecoilValue(isFormInvalidFormState);
  // 프로필 이미지 & 프로필 이미지 주소
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageURL, setProfileImageURL] = useState<string | null>(
    profileData?.profileImageUrl ?? null
  );
  // 업데이트 데이터
  const [updatedUserData, setUpdatedUserData] =
    useRecoilState(updatedUserDataState);

  useEffect(() => {
    // 데이터 받아와지면 프로필 검증 완료
    if (profileData) {
      setProfileImageURL(profileData.profileImageUrl);
      localStorage.setItem('hasProfile', 'true');
    }
  }, [profileData]);

  // 프로필 유무에 따라 렌더링 분기하기 위한 변수
  const hasProfile = localStorage.getItem('hasProfile');

  // 프로필 수정
  const { mutate: editProfile, isPending: editProfileIsPending } =
    useEditProfile();

  const formData = new FormData();
  const requestData: Record<string, string> = {};

  // requsetData에 updateData 넣기
  if (updatedUserData.nickname) requestData.nickname = updatedUserData.nickname;
  if (updatedUserData.phone) requestData.phone = updatedUserData.phone;
  if (updatedUserData.mbti) requestData.mbti = updatedUserData.mbti;
  if (updatedUserData.introduction) {
    requestData.introduction = updatedUserData.introduction;
  }

  // formData에 requse 객체로 묶어서 전달
  formData.append(
    'request',
    new Blob([JSON.stringify(requestData)], { type: 'application/json' })
  );

  // 프로필 이미지가 있으면 프로필 이미지에 데이터 넣기
  if (profileImage) {
    formData.append('profileImage', profileImage);
    console.log(profileImage);
  }

  // 저장 버튼 click 이벤트 함수
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // 빈값으로 수정 요청할 때 처리
    if (
      !updatedUserData.nickname &&
      !updatedUserData.phone &&
      !updatedUserData.mbti &&
      !updatedUserData.introduction &&
      !profileImage
    ) {
      alert('수정한 내용이 없습니다.');
      setIsModified(false);
      return;
    }

    // formData 전달
    editProfile(formData, {
      onSuccess: async () => {
        await refetch();
      },
      onError: error => {
        console.log(error);
        alert('프로필 수정에 실패하였습니다.');
      },
    });
    setIsModified(false);
    setIsCanceled(false);
    setUpdatedUserData({});
  };

  // 취소 버튼
  const handleCancel = () => {
    setProfileImage(null);
    setIsModified(false);
    setIsCanceled(true);
    setProfileImageURL(profileImageURL);
    setUpdatedUserData({});
  };

  // 프로필 이미지 변경 이벤트 핸들러
  const handleProfileImageChange = useCallback((newImageUrl: string | null) => {
    setProfileImageURL(newImageUrl);

    if (newImageUrl) {
      setUpdatedUserData(prevData => ({
        ...prevData,
        profileImageUrl: newImageUrl,
      }));
    }
  }, []);

  if (hasProfile === 'false') {
    return <ProfileRedirect />;
  }

  if (fetchProfileDataIsLoading || editProfileIsPending) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center font-bold text-3xl">
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchProfileDataIsError) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center">
        프로필 조회 중 에러가 발생했습니다.
      </div>
    );
  }

  return hasProfile === 'true' && profileData ? (
    <div className="w-full">
      <div className="w-[680px] m-auto flex flex-col items-center mt-[30px]">
        {isModified ? (
          <div className="mb-[30px]">
            <ProfileImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              defaultImage="/image/default_profile_image.png"
              profileURL={profileImageURL}
              onProfileImageChange={handleProfileImageChange}
            />
          </div>
        ) : (
          <img
            src={
              profileData?.profileImageUrl || '/image/upload_profile_image.webp'
            }
            alt="user profile image"
            className={`w-[150px] h-[150px] object-cover rounded-full mb-[30px] ${
              profileData?.profileImageUrl &&
              'bg-white p-[5px] border-[1px] border-gray-600'
            }`}
            // 기본 이미지 에러 핸들링을 위해 추가
            onError={e => {
              e.currentTarget.src = '/image/default_profile_image.png';
            }}
          />
        )}

        <InfoForm
          isModified={isModified}
          isCanceled={isCanceled}
          profileData={profileData}
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
