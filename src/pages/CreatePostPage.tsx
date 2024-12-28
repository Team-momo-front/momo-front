import Header from '../components/Header/Header';
import Categories from '../components/Categories';
import { RiImageAddFill } from 'react-icons/ri';
import FormField from '../components/FormField';
import { useToggleCategory } from '../hooks/useToggleCategory';
import useCreatePostForm from '../hooks/useCreatePostForm';

const CreatePostPage = () => {
  const {
    formData,
    thumbnailURL,
    handleSubmit,
    handleFileChange,
    handleInputChange,
  } = useCreatePostForm();

  const { categories, toggleCategory } = useToggleCategory();

  return (
    <>
      <Header />
      <div className="flex justify-center px-16 py-10">
        <div className="w-full max-w-5xl px-14">
          <h1 className="text-2xl font-bold mb-6 text-center">밥친구 구하기</h1>
          <form onSubmit={handleSubmit} className="flex gap-x-8 justify-center">
            <div className="space-y-4">
              <FormField
                label="제목"
                type="text"
                value={formData.title}
                name="title"
                onChange={handleInputChange}
              />

              <FormField
                label="모임 날짜"
                type="datetime-local"
                size="60"
                value={formData.meetingDate}
                name="meetingDate"
                onChange={handleInputChange}
              />
              <FormField
                label="모임 인원"
                type="number"
                size="24"
                value={
                  formData.participationCount === 0
                    ? ''
                    : formData.participationCount
                }
                name="participationCount"
                onChange={handleInputChange}
                min={0}
                max={99}
              />
              <FormField
                label="장소"
                type="text"
                value={formData.location}
                name="location"
                onChange={handleInputChange}
              />
              <div className="form-control">
                <div className="label">
                  <span className="label-text">카테고리</span>
                </div>
                <Categories
                  selectedCategories={categories}
                  toggleCategory={toggleCategory}
                  size="xs"
                />
              </div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">내용</span>
                </div>
                <textarea
                  className="textarea textarea-bordered max-w-sm text-sm"
                  rows={4}
                  value={formData.content}
                  name="content"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="flex flex-col justify-between">
              <label htmlFor="file-upload" className="cursor-pointer">
                <img
                  src={thumbnailURL || 'image/placeholder_thumbnail.webp'}
                  alt="Thumbnail"
                  className="w-[280px] h-[180px] object-cover rounded-3xl"
                />
                <RiImageAddFill
                  size={40}
                  className="text-black hover:text-gray-500 ml-auto -mt-5"
                />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <div className="flex justify-end mt-auto">
                <button type="submit" className="btn btn-primary">
                  업로드
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
