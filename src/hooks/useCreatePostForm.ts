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
    thumbnail: undefined,
  });

  const { mutate: createMeeting } = useCreateMeeting();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMeeting(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    setFormData(prev => ({
      ...prev,
      thumbnail: file ? URL.createObjectURL(file) : undefined,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateLocation = (
    locatinoId: string,
    latitude: string,
    longitude: string,
    address: string
  ) => {
    setFormData(prev => ({
      ...prev,
      locatinoId: Number(locatinoId),
      latitude: Number(latitude),
      longitude: Number(longitude),
      address,
    }));
  };

  const updateCategories = (category: string[]) => {
    setFormData(prev => ({ ...prev, category }));
  };

  return {
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
