import { useLocation, useParams } from 'react-router-dom';
import { convertGenderToLabel } from '../utils/convertGenderToLabel';
import { calculateAge } from '../utils/calculateAge';
import InfoFormField from '../components/MyPage/InfoFormField';
import UserProfileBtn from '../components/UserProfileBtn';
import ChatFloatingBtn from '../components/Chat/ChatFloatingBtn';
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import LoadingSpinner from '../components/LoadingSpinner';

const UserProfilePage = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useGetUserProfile(Number(userId));
  const location = useLocation();
  const isChatUserProfilePage = location.pathname.includes('/chat/profile');

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  if (!userProfile) return <div>프로필이 없습니다.</div>;

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center m-auto">
        <div className="flex flex-col gap-4 items-center">
          <img
            src={
              userProfile.profileImageUrl || '/image/default_profile_image.webp'
            }
            alt="Profile"
            className={`w-[150px] h-[150px] object-cover rounded-full mb-[30px] border-gray-600 border-[1px] ${
              userProfile.profileImageUrl && 'bg-white p-[5px]'
            }`}
          />
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-6">
              <InfoFormField
                name="nickname"
                label="닉네임"
                type="text"
                disabled
                required
                placeholder={userProfile.nickname}
              />
              <InfoFormField
                name="age"
                label="나이"
                type="text"
                placeholder={
                  userProfile.birth && calculateAge(userProfile.birth)
                }
                disabled
              />

              <div className="w-[320px]">
                <label className="form-control w-full max-w-xs">
                  <div className="label p-0">
                    <span className="label-text font-bold text-lg mb-2">
                      자기소개
                    </span>
                  </div>
                  <textarea
                    value={userProfile.introduction}
                    className={
                      'textarea-custom-modified textarea-bordered h-24 py-4 resize-none font-bold placeholder:font-bold'
                    }
                    disabled
                  ></textarea>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <InfoFormField
                name="gender"
                label="성별"
                type="text"
                placeholder={
                  userProfile?.gender &&
                  convertGenderToLabel(userProfile.gender)
                }
                disabled
              />
              <InfoFormField
                name="mbti"
                label="MBTI"
                type="text"
                disabled
                value={userProfile.mbti === 'NONE' ? '' : userProfile.mbti}
              />
              <div className="flex gap-3 flex-1 items-end justify-end">
                <UserProfileBtn />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isChatUserProfilePage && <ChatFloatingBtn />}
    </>
  );
};

export default UserProfilePage;
