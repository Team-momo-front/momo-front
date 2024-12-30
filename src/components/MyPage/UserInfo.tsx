import { useState, useEffect } from 'react';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { User } from '../../types/User';
import { useMBTIValidation } from '../../hooks/useMBTIValidation';
import { validateNickname, validatePhoneNumber } from '../Join/validation';
import InfoFormField from './InfoFormField';

interface UserInfoProps {
  updatedUserData: User;
  setUpdatedUserData: React.Dispatch<React.SetStateAction<User>>;
  isModified: boolean;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

type InfoData = {
  nickname: string;
  phoneNumber: string;
  mbti?: string;
  introduction?: string;
};
const UserInfo: React.FC<UserInfoProps> = ({
  updatedUserData,
  setUpdatedUserData,
  isModified,
}) => {
  // TODO: 서버에서 데이터 받아 전역상태관리 필요
  const { email, nickname, phoneNumber, gender, birth, mbti, introduction } =
    updatedUserData;

  const [infoData, setInfoData] = useState<InfoData>({
    nickname: nickname,
    phoneNumber: phoneNumber,
    mbti: mbti,
    introduction: introduction,
  });

  const handleChange = (field: keyof User, value: string) => {
    setInfoData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    setUpdatedUserData({ ...updatedUserData, ...infoData });
  }, [infoData]);

  const { mbtiError, validateMBTI } = useMBTIValidation();
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-6">
          <InfoFormField
            name="nickname"
            label="닉네임"
            type="text"
            disabled={!isModified}
            required
            value={infoData.nickname || ''}
            onChange={e => handleChange('nickname', e.target.value)}
            onBlur={e => {
              setNicknameError(validateNickname(e.target.value));
            }}
            isModified={isModified}
            error={nicknameError}
          />

          <InfoFormField
            name="email"
            label="이메일"
            type="text"
            placeholder={email}
            disabled
            isModified={isModified}
          />

          <InfoFormField
            name="phoneNumber"
            label="휴대폰 번호"
            type="tel"
            placeholder={phoneNumber}
            disabled={!isModified}
            value={infoData.phoneNumber || ''}
            onChange={e =>
              handleChange('phoneNumber', formatPhoneNumber(e.target.value))
            }
            onBlur={e => {
              if (!e.target.value) {
                setPhoneNumberError('휴대폰 번호를 입력해주세요.');
              } else {
                setPhoneNumberError(validatePhoneNumber(e.target.value));
              }
            }}
            isModified={isModified}
            error={phoneNumberError}
          />

          <div className="w-[320px]">
            <label className="form-control w-full max-w-xs">
              <div className="label p-0">
                <span className="label-text font-bold text-lg mb-2">
                  자기소개
                </span>
              </div>
              <textarea
                value={infoData.introduction || ''}
                className={
                  isModified
                    ? 'textarea textarea-bordered w-full h-24 py-4 placeholder-gray-500 font-bold text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none'
                    : 'textarea-custom-disabled textarea-bordered h-24 py-4 resize-none font-bold placeholder:font-bold'
                }
                onChange={e => handleChange('introduction', e.target.value)}
                disabled={!isModified}
              ></textarea>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <InfoFormField
            name="gender"
            label="성별"
            type="text"
            placeholder={gender}
            disabled
            isModified={isModified}
          />

          <InfoFormField
            name="birth"
            label="생년 월일"
            type="text"
            placeholder={birth}
            disabled
            isModified={isModified}
          />

          <InfoFormField
            name="mbti"
            label="MBTI"
            type="text"
            disabled={!isModified}
            value={infoData.mbti || ''}
            onChange={e => handleChange('mbti', e.target.value.toUpperCase())}
            onBlur={e => validateMBTI(e.target.value)}
            isModified={isModified}
            maxLength={4}
            error={mbtiError}
          />
        </div>
      </div>
    </>
  );
};

export default UserInfo;
