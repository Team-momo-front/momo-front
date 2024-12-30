import { useState, useEffect } from 'react';

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
      setUpdatedProfileURL(null);
    }
  }, [profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <label
      htmlFor="file-upload"
      className="w-full flex justify-center cursor-pointer"
    >
      <img
        src={updatedProfileURL || defaultImage}
        alt="Profile"
        className={`w-[150px] h-[150px] object-cover rounded-full ${
          updatedProfileURL && 'bg-white p-[5px] border-gray-600 border-[1px]'
        }`}
      />
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default ProfileImageUpload;
