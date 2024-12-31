import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

type ProfileImageUploadProps = {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
  defaultImage: string;
  profileURL?: string | null;
  onProfileImageChange?: (newImageURL: string | null) => void;
};
const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  setProfileImage,
  defaultImage,
  profileURL,
  onProfileImageChange,
}) => {
  const [updatedProfileURL, setUpdatedProfileURL] = useState<string | null>(
    profileURL ?? null
  );

  const uploadProfileImage = '../../public/image/upload_profile_image.webp';

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (profileImage) {
      const objectURL = URL.createObjectURL(profileImage);
      setUpdatedProfileURL(objectURL);

      if (onProfileImageChange) {
        onProfileImageChange(objectURL);
      }

      return () => {
        if (objectURL) {
          URL.revokeObjectURL(objectURL);
        }
      };
    } else {
      setUpdatedProfileURL(profileURL ?? null);
    }
  }, [profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileImage(file);
    }
    setIsModalOpen(false);
  };

  const handleResetImage = () => {
    setUpdatedProfileURL(defaultImage);
    if (onProfileImageChange) {
      onProfileImageChange(defaultImage);
    }
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <label
        className="cursor-pointer"
        onClick={
          profileImage || updatedProfileURL ? handleOpenModal : undefined
        }
      >
        <img
          src={updatedProfileURL || uploadProfileImage}
          alt="Profile"
          className={`w-[150px] h-[150px] object-cover rounded-full ${
            updatedProfileURL && 'bg-white p-[5px] border-gray-600 border-[1px]'
          }`}
        />
        {(!profileImage || !profileURL) && (
          <input
            id="file-upload"
            type="file"
            className="hidden "
            accept="image/*"
            disabled={!!profileURL || !!profileImage}
            onChange={handleFileChange}
          />
        )}
      </label>

      {/* 모달 */}
      {isModalOpen && (
        <dialog id="my_modal_2" className="modal modal-open">
          <div className="modal-box flex flex-col justify-between items-center max-w-[260px] py-8 px-6 h-44 gap-4 rounded-3xl">
            <button
              type="button"
              className="btn btn-second w-full"
              onClick={handleResetImage}
            >
              기본 이미지로 설정
            </button>
            <label
              htmlFor="file-update"
              className="btn btn-second cursor-pointer w-full"
            >
              프로필 이미지 선택
              <input
                id="file-update"
                type="file"
                className="hidden "
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <div className="modal-actio absolute top-3 right-3">
              <button
                type="button"
                className="font-extrabold"
                onClick={handleCloseModal}
              >
                <MdClose />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProfileImageUpload;
