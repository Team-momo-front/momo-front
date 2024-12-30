import { users } from '../../mocks/users';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { User } from '../../types/User';
import { useMBTIValidation } from '../../hooks/useMBTIValidation';

interface UserInfoProps {
  updatedUserData: User;
  setUpdatedUserData: React.Dispatch<React.SetStateAction<User>>;
  isModified: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({
  updatedUserData,
  setUpdatedUserData,
  isModified,
}) => {
  const userData = users[0];

  const {
    email,
    nickname,
    phoneNumber,
    gender,
    birth,
    mbti = '',
    introduction = '',
  } = userData;

  const handleChange = (field: keyof User, value: string) => {
    setUpdatedUserData(prev => ({ ...prev, [field]: value }));
  };

  const { mbtiError, validateMBTI } = useMBTIValidation();

  return (
    <>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-6">
          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">
                  닉네임
                </span>
              </div>
              <input
                type="text"
                placeholder={nickname}
                disabled={!isModified}
                value={updatedUserData.nickname || ''}
                onChange={e => handleChange('nickname', e.target.value)}
                className={
                  isModified
                    ? 'input input-bordered bg-white w-full p-4 font-bold text-sm placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                    : 'input-custom-disabled font-bold text-sm p-4'
                }
              />
            </label>
          </div>

          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">
                  이메일
                </span>
              </div>
              <input
                type="text"
                placeholder={email}
                disabled
                className={
                  isModified
                    ? 'input input-border text-[0.875rem] placeholder:font-bold'
                    : 'input-custom-disabled font-bold text-sm p-4'
                }
              />
            </label>
          </div>

          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">
                  휴대폰 번호
                </span>
              </div>
              <input
                type="tel"
                placeholder={phoneNumber}
                disabled={!isModified}
                value={updatedUserData.phoneNumber || ''}
                onChange={e =>
                  handleChange('phoneNumber', formatPhoneNumber(e.target.value))
                }
                className={
                  isModified
                    ? 'input input-bordered bg-white w-full p-4 font-bold text-sm placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                    : 'input-custom-disabled font-bold text-sm p-4'
                }
              />
            </label>
          </div>

          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">
                  자기소개
                </span>
              </div>
              <textarea
                className={
                  isModified
                    ? 'textarea textarea-bordered w-full h-24 py-4 placeholder-gray-500 font-bold text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none'
                    : 'textarea-custom-disabled textarea-bordered h-24 py-4 resize-none font-bold placeholder:font-bold'
                }
                value={updatedUserData.introduction || ''}
                onChange={e => handleChange('introduction', e.target.value)}
                placeholder={introduction}
                disabled={!isModified}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">성별</span>
              </div>
              <input
                type="text"
                placeholder={gender}
                disabled
                className={
                  isModified
                    ? 'input input-border text-[0.875rem] placeholder:font-bold'
                    : 'input-custom-disabled font-bold text-sm p-4'
                }
              />
            </label>
          </div>
          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">
                  생년월일
                </span>
              </div>
              <input
                type="text"
                placeholder={birth}
                disabled
                className={
                  isModified
                    ? 'input input-border text-[0.875rem] placeholder:font-bold'
                    : 'input-custom-disabled font-bold text-sm p-4'
                }
              />
            </label>
          </div>
          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">MBTI</span>
              </div>
              <input
                type="text"
                placeholder={mbti}
                disabled={!isModified}
                value={updatedUserData.mbti || ''}
                onChange={e =>
                  handleChange('mbti', e.target.value.toUpperCase())
                }
                onBlur={e => validateMBTI(e.target.value)}
                className={
                  isModified
                    ? 'input input-bordered bg-white w-full p-4 font-bold text-sm placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                    : 'input-custom-disabled font-bold text-sm p-4'
                }
                maxLength={4}
              />
              {mbtiError && (
                <p className="mt-1 font-bold text-[12px] text-error">
                  {mbtiError}
                </p>
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
