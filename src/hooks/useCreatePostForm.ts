import { useState } from 'react';
import type { CreateMeetingRequest } from '../types/Meeting';
import { useCreateMeeting } from './useCreateMeeting';

const useCreatePostForm = () => {
  const [formData, setFormData] = useState<CreateMeetingRequest>({
    title: '',
    locationId: 0,
    latitude: 0,
    longitude: 0,
    address: '',
    meetingDateTime: '',
    maxCount: 0,
    category: [],
    content: '',
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    'image/upload_image.webp'
  );

  const { mutate: createMeeting } = useCreateMeeting();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postFormData = new FormData();
    postFormData.append(
      'request',
      new Blob([JSON.stringify(formData)], { type: 'application/json' })
    );

    if (thumbnail) {
      postFormData.append('thumbnail', thumbnail);
    } else {
      const defaultThumbnailImage = new File(
        ['/images/default_profile_image.png'],
        'default_profile_image.png',
        { type: 'image/png' }
      );
      postFormData.append('profileImage', defaultThumbnailImage);
    }

    createMeeting(postFormData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setThumbnail(file);
      const fileUrl = URL.createObjectURL(file);
      setThumbnailUrl(fileUrl);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateLocation = (
    locationId: string,
    latitude: string,
    longitude: string,
    address: string
  ) => {
    setFormData(prev => ({
      ...prev,
      locationId: Number(locationId),
      latitude: Number(latitude),
      longitude: Number(longitude),
      address,
    }));
  };

  const updateCategories = (category: string[]) => {
    setFormData(prev => ({ ...prev, category }));
  };

  return {
    thumbnailUrl,
    formData,
    setFormData,
    handleSubmit,
    handleFileChange,
    handleInputChange,
    updateLocation,
    updateCategories,
  };
};

export default useCreatePostForm;
