import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Categories from '../components/Categories';
import FormField from '../components/FormField';
import KakaoMapModal from '../components/modals/KakaoMapModal';
import useCreatePostForm from '../hooks/useCreatePostForm';
import { useToggleCategory } from '../hooks/useToggleCategory';
import { PlaceDetail } from '../types/Post';
import {
  getLocalDateTime,
  getOneYearLaterDateTime,
} from '../utils/getLocalDateTime';
import LoadingSpinner from '../components/LoadingSpinner';
import { categoryValueToKey } from '../utils/categoryValueToKey';

const CreatePostPage = () => {
  const {
    thumbnailUrl,
    formData,
    handleSubmit,
    handleFileChange,
    handleInputChange,
    updateLocation,
    updateCategories,
    isPending,
  } = useCreatePostForm();

  const { categories, toggleCategory } = useToggleCategory();

  useEffect(() => {
    const mappedCategories = categories.map(
      category => categoryValueToKey[category]
    );
    updateCategories(mappedCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchPlace = (place: PlaceDetail) => {
    setSelectedPlace(place);
    updateLocation(place.id, place.y, place.x, place.address_name);
    closeModal();
  };

  return (
    <>
      <div className="flex justify-center px-16 py-10">
        <div className="w-full max-w-5xl px-14">
          <h1 className="text-2xl font-bold mb-6 text-center">밥친구 구하기</h1>
          {isPending ? (
            <div className="flex justify-center items-center w-full h-[70vh]">
              <LoadingSpinner />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex gap-x-8 justify-center"
            >
              <div className="space-y-4">
                <FormField
                  label="제목"
                  type="text"
                  value={formData.title}
                  name="title"
                  onChange={handleInputChange}
                  minLength={1}
                  maxLength={60}
                />
                <FormField
                  label="모임 날짜"
                  type="datetime-local"
                  value={formData.meetingDateTime}
                  name="meetingDateTime"
                  onChange={handleInputChange}
                  min={getLocalDateTime()}
                  max={getOneYearLaterDateTime()}
                />
                <FormField
                  label="모임 인원"
                  type="number"
                  value={formData.maxCount === 0 ? '' : formData.maxCount}
                  name="maxCount"
                  onChange={handleInputChange}
                  min={2}
                  max={99}
                />
                <div className="form-control gap-y-4">
                  <div className="label">
                    <span className="label-text font-bold">장소</span>
                  </div>
                  <input
                    type="text"
                    value={selectedPlace?.place_name || ''}
                    placeholder="장소"
                    readOnly
                    className="input input-bordered"
                  />
                  <input
                    type="text"
                    value={formData.address}
                    placeholder="주소"
                    readOnly
                    className="input input-bordered"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={openModal}
                  >
                    모임 장소 찾기
                  </button>
                </div>
                <div className="form-control">
                  <div className="label">
                    <span className="label-text font-bold">카테고리</span>
                  </div>
                  <Categories
                    selectedCategories={categories}
                    toggleCategory={toggleCategory}
                    size="xs"
                  />
                </div>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-bold">내용</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered max-w-sm text-sm resize-none"
                    rows={10}
                    value={formData.content}
                    name="content"
                    onChange={handleInputChange}
                    minLength={1}
                    maxLength={600}
                    required
                  />
                </label>
              </div>
              <div className="flex flex-col justify-between items-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <img
                    src={thumbnailUrl || 'image/upload_image.webp'}
                    alt="Thumbnail"
                    className="w-[280px] h-[178.48px] object-cover rounded-3xl"
                  />
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </label>
                {selectedPlace && (
                  <div className="mt-4">
                    <Map
                      center={{
                        lat: parseFloat(selectedPlace.y),
                        lng: parseFloat(selectedPlace.x),
                      }}
                      className="w-[320px] h-[320px]"
                      level={5}
                    >
                      <MapMarker
                        position={{
                          lat: parseFloat(selectedPlace.y),
                          lng: parseFloat(selectedPlace.x),
                        }}
                      />
                    </Map>
                  </div>
                )}
                <div className="flex justify-end mt-auto ml-auto">
                  <button type="submit" className="btn btn-primary">
                    업로드
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      {isModalOpen && (
        <KakaoMapModal onClose={closeModal} onSearch={handleSearchPlace} />
      )}
    </>
  );
};

export default CreatePostPage;
