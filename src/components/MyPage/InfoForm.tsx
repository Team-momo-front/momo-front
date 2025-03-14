import { useState, useEffect } from 'react';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { MyProfile } from '../../types/User';
import { useMBTIValidation } from '../../hooks/useMBTIValidation';
import { validateNickname, validatePhoneNumber } from '../Join/validation';
import InfoFormField from './InfoFormField';
import { convertGenderToLabel } from '../../utils/convertGenderToLabel';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isFormInvalidFormState,
  updatedUserDataState,
} from '../../states/recoilState';

interface UserInfoProps {
  isModified: boolean;
  isCanceled: boolean;
  profileData: MyProfile;
}

const InfoForm: React.FC<UserInfoProps> = ({
  isModified,
  isCanceled,
  profileData,
}) => {
  const [updatedUserData, setUpdatedUserData] =
    useRecoilState(updatedUserDataState);

  const handleChange = (field: keyof MyProfile, value: string) => {
    setUpdatedUserData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const { mbtiError, setMbtiError, validateMBTI } = useMBTIValidation();
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

  const setIsInvalidUserForm = useSetRecoilState(isFormInvalidFormState);

  useEffect(() => {
    setNicknameError(null);
    setPhoneNumberError(null);
    setMbtiError(null);
  }, [isCanceled]);

  useEffect(() => {
    if (
      nicknameError ||
      phoneNumberError ||
      (profileData.mbti !== '' && mbtiError)
    ) {
      setIsInvalidUserForm(true);
    } else {
      setIsInvalidUserForm(false);
    }
  }, [nicknameError, mbtiError, phoneNumberError]);

  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-col gap-6">
        <InfoFormField
          name="nickname"
          label="닉네임"
          type="text"
          disabled={!isModified}
          required
          value={isModified ? updatedUserData.nickname : profileData.nickname}
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
          placeholder={profileData.email}
          disabled
          isModified={isModified}
        />

        <InfoFormField
          name="phone"
          label="휴대폰 번호"
          type="tel"
          placeholder={profileData.phone}
          disabled={!isModified}
          value={isModified ? updatedUserData.phone : profileData.phone}
          onChange={e =>
            handleChange('phone', formatPhoneNumber(e.target.value))
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
              value={
                isModified
                  ? updatedUserData.introduction
                  : profileData.introduction
              }
              className={
                isModified
                  ? 'textarea textarea-bordered w-full h-24 py-4 placeholder-gray-500 font-bold text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none'
                  : 'textarea-custom-modified textarea-bordered h-24 py-4 resize-none font-bold placeholder:font-bold'
              }
              onChange={e => handleChange('introduction', e.target.value)}
              disabled={!isModified}
              maxLength={150}
            ></textarea>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <InfoFormField
          name="gender"
          label="성별"
          type="text"
          placeholder={convertGenderToLabel(profileData.gender)}
          disabled
          isModified={isModified}
        />

        <InfoFormField
          name="birth"
          label="생년 월일"
          type="text"
          placeholder={profileData.birth}
          disabled
          isModified={isModified}
        />

        <InfoFormField
          name="mbti"
          label="MBTI"
          type="text"
          disabled={!isModified}
          value={isModified ? updatedUserData.mbti : profileData.mbti}
          onChange={e => handleChange('mbti', e.target.value.toUpperCase())}
          onBlur={e => validateMBTI(e.target.value)}
          isModified={isModified}
          maxLength={4}
          error={mbtiError}
        />
      </div>
    </div>
  );
};

export default InfoForm;
