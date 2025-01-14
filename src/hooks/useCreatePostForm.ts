import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  title: string;
  locatinoId: number | null;
  latitude: number | null;
  longitude: number | null;
  address: string;
  meetingDateTime: string;
  maxCount: number;
  category: string[];
  content: string;
  thumbnail: File | null;
}

const useCreatePostForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    locatinoId: null,
    latitude: null,
    longitude: null,
    address: '',
    meetingDateTime: '',
    maxCount: 0,
    category: [],
    content: '',
    thumbnail: null,
  });

  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.thumbnail) {
      const objectURL = URL.createObjectURL(formData.thumbnail);
      setThumbnailURL(objectURL);
      return () => {
        if (objectURL) {
          URL.revokeObjectURL(objectURL);
        }
      };
    } else {
      setThumbnailURL(null);
    }
  }, [formData.thumbnail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      ...formData,
      thumbnail: formData.thumbnail
        ? URL.createObjectURL(formData.thumbnail)
        : undefined,
    };
    console.log(postData); // TODO: 서버에 POST
    navigate('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
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
    thumbnailURL,
    handleSubmit,
    handleFileChange,
    handleInputChange,
    updateLocation,
    updateCategories,
  };
};

export default useCreatePostForm;
