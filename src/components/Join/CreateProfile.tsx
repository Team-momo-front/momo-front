import { useState, useEffect } from 'react';
import JoinField from './JoinField.tsx';
import { useMBTIValidation } from '../../hooks/useMBTIValidation.ts';

type profileForm = {
  gender: string;
  birthday: string;
  profileImage: File | null;
  introduction: string;
  mbti: string;
};

const CreateProfile = () => {
  const [profileForm, setProfileForm] = useState<profileForm>({
    gender: '',
    birthday: '',
    profileImage: null,
    introduction: '',
    mbti: '',
  });

  const [genderError, setGenderError] = useState<string | null>(null);

  const { mbtiError, validateMBTI } = useMBTIValidation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProfileForm(prev => ({
      ...prev,
      [name]: name === 'mbti' ? value.toUpperCase() : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileForm(prev => ({ ...prev, profileImage: file }));
    }
  };

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profileForm.gender) {
      setGenderError('성별을 선택하세요.');
    }

    console.log('제출', profileForm);
  };

  const [profileURL, setProfileURL] = useState<string | null>(null);

  useEffect(() => {
    if (profileForm.profileImage) {
      const objectURL = URL.createObjectURL(profileForm.profileImage);
      setProfileURL(objectURL);
      return () => {
        if (objectURL) {
          URL.revokeObjectURL(objectURL);
        }
      };
    } else {
      setProfileURL(null);
    }
  }, [profileForm.profileImage]);

  const [selectedGender, setSelectedGender] = useState<
    'male' | 'female' | null
  >(null);

  const toggleGenderButton = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setProfileForm(prev => ({ ...prev, gender }));
  };

  const today = new Date();
  const maxDay = today.toISOString().slice(0, 10);

  const isDisabled =
    !!genderError ||
    !profileForm.gender ||
    !profileForm.birthday ||
    (!!profileForm.mbti && mbtiError);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="w-[320px] flex flex-col gap-4"
        onSubmit={handleProfileSubmit}
      >
        <label
          htmlFor="file-upload"
          className="w-full flex justify-center cursor-pointer"
        >
          <img
            src={profileURL || 'image/upload_profile_image.webp'}
            alt="Profile Image"
            className={
              profileURL
                ? 'w-[150px] h-[150px] bg-white p-[5px] border-gray-600 border-[1px] object-cover rounded-full'
                : 'w-[150px] h-[150px] object-cover rounded-full'
            }
          />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <div>
          <label className="block mb-2">
            <span className="font-bold text-sm">성별</span>
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              className={`btn w-32 ${
                selectedGender === 'male' ? 'btn-primary' : 'btn-second'
              }`}
              onClick={() => toggleGenderButton('male')}
            >
              남성
            </button>
            <button
              type="button"
              className={`btn w-32 ${
                selectedGender === 'female' ? 'btn-primary' : 'btn-second'
              }`}
              onClick={() => toggleGenderButton('female')}
            >
              여성
            </button>
          </div>
          {genderError && (
            <p className="mt-1 font-bold text-[12px] text-error">
              {genderError}
            </p>
          )}
        </div>

        <JoinField
          id="birthday"
          name="birthday"
          label="생년 월일"
          type="date"
          value={profileForm.birthday}
          onChange={handleChange}
          required
          error={null}
          max={maxDay}
          min="1900-01-01"
          placeholder="생년월일을 입력하세요."
        />
        <JoinField
          id="mbti"
          name="mbti"
          label="MBTI"
          type="text"
          value={profileForm.mbti}
          onChange={handleChange}
          onBlur={e => validateMBTI(e.target.value)}
          error={mbtiError}
          placeholder="MBTI를 입력해주세요."
          required={false}
          length={4}
        />
        <div>
          <label htmlFor="introduction" className="block mb-2">
            <span className="font-bold text-sm">자기소개</span>
          </label>
          <textarea
            id="introduction"
            className="textarea textarea-bordered w-full p-4 placeholder-gray-500 font-bold text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            rows={2}
            value={profileForm.introduction}
            name="introduction"
            onChange={handleChange}
            placeholder="간단한 자기소개를 입력해주세요."
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`btn ${isDisabled ? 'btn-disabled' : 'btn-primary'}`}
        >
          회원가입 완료하기
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
