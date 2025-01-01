import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  title: string;
  meetingDate: string;
  location: string;
  participationCount: number;
  content: string;
  thumbnail: File | null;
  categories: string[];
}

const useCreatePostForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    meetingDate: '',
    location: '',
    participationCount: 0,
    content: '',
    thumbnail: null,
    categories: [],
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

  const updateLocation = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const updateCategories = (categories: string[]) => {
    setFormData(prev => ({ ...prev, categories }));
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
