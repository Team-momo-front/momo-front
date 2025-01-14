import { useState } from 'react';
import { Link } from 'react-router-dom';
import JoinField from './JoinField.tsx';
import { useMBTIValidation } from '../../hooks/useMBTIValidation.ts';
import { GiPartyPopper } from 'react-icons/gi';
import ProfileImageUpload from '../ProfileImageUpload.tsx';

type profileForm = {
  gender: string;
  birth: string;
  introduction: string;
  mbti: string;
};

const CreateProfile = () => {
  const [profileForm, setProfileForm] = useState<profileForm>({
    gender: '',
    birth: '',
    introduction: '',
    mbti: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProfileForm(prev => ({
      ...prev,
      [name]: name === 'mbti' ? value.toUpperCase() : value,
    }));
  };

  const [selectedGender, setSelectedGender] = useState<
    'male' | 'female' | null
  >(null);

  const toggleGenderButton = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setProfileForm(prev => ({ ...prev, gender }));
  };

  const today = new Date();
  const maxDay = today.toISOString().slice(0, 10);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { mbtiError, validateMBTI } = useMBTIValidation();

  const isDisabled =
    !profileForm.gender ||
    !profileForm.birth ||
    (!!profileForm.mbti && !!mbtiError);

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);

    // TODO: API 요청
  };

  return (
    <div className="w-full h-screen flex justify-center mt-8">
      <form
        className="w-[320px] flex flex-col gap-4"
        onSubmit={handleProfileSubmit}
      >
        <label
          htmlFor="file-upload"
          className="w-full flex justify-center cursor-pointer"
        >
          <ProfileImageUpload
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            defaultImage="image/default_profile_image.webp"
          />
        </label>

        <div>
          <label className="block mb-2">
            <span className="font-bold text-sm">성별*</span>
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
        </div>

        <JoinField
          name="birth"
          label="생년 월일*"
          type="date"
          value={profileForm.birth}
          onChange={handleChange}
          required
          error={null}
          max={maxDay}
          min="1900-01-01"
          placeholder="생년월일을 입력하세요."
        />

        <JoinField
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
            maxLength={150}
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`btn ${isDisabled ? 'btn-disabled' : 'btn-primary'}`}
        >
          회원가입 완료하기
        </button>
        <p className="font-bold text-sm text-gray-500">
          *표시된 항목은 필수 입력 항목입니다.
        </p>
      </form>

      {isModalOpen && (
        <dialog id="my_modal_5" className="modal modal-open sm:modal-middle ">
          <div className="modal-box flex flex-col items-center gap-4">
            <GiPartyPopper className="py-3 w-[100px] h-[100px] fill-primary" />
            <p className="py-3 font-bold">
              축하합니다! 회원가입이 완료되었습니다!
            </p>
            <Link to="/login">
              <button type="button" className="btn btn-primary">
                로그인 하러 가기
              </button>
            </Link>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CreateProfile;
