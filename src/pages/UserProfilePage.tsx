import { useParams } from 'react-router-dom';
import { users } from '../mocks/users';
import { convertGenderToLabel } from '../utils/convertGenderToLabel';
import { calculateAge } from '../utils/calculateAge';
import InfoFormField from '../components/MyPage/InfoFormField';
import UserProfileBtn from '../components/UserProfileBtn';

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();

  // TODO: 유저 프로필 가져오기 API
  const selectedUser = users.find(user => user.userId === userId);

  return (
    <div className="w-full h-screen flex justify-center items-center m-auto">
      <div className="flex flex-col gap-4 items-center">
        <img
          src={
            selectedUser?.profileImage || '/image/default_profile_image.webp'
          }
          alt="Profile"
          className={`w-[150px] h-[150px] object-cover rounded-full mb-[30px] ${
            selectedUser?.profileImage &&
            'bg-white p-[5px] border-gray-600 border-[1px]'
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
              placeholder={selectedUser?.nickname}
            />
            <InfoFormField
              name="age"
              label="나이"
              type="text"
              placeholder={
                selectedUser?.birth && calculateAge(selectedUser?.birth)
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
                  value={selectedUser?.introduction}
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
                selectedUser?.gender &&
                convertGenderToLabel(selectedUser.gender)
              }
              disabled
            />

            <InfoFormField
              name="mbti"
              label="MBTI"
              type="text"
              disabled
              value={selectedUser?.mbti}
            />

            <div className="flex gap-3 flex-1 items-end justify-end">
              <UserProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
