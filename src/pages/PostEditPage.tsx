import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Categories from '../components/Categories';
import DetailPageLayout from '../components/DetailPageLayout';
import FormField from '../components/FormField';
import KakaoMapModal from '../components/modals/KakaoMapModal';
import useEditMeeting from '../hooks/useEditMeeting';
import type {
  CreateMeetingRequest,
  CreateMeetingResponse,
} from '../types/Meeting';
import type { PlaceDetail } from '../types/Post';
import {
  getLocalDateTime,
  getOneYearLaterDateTime,
} from '../utils/getLocalDateTime';

const PostEditPage = ({ meeting }: { meeting: CreateMeetingResponse }) => {
  const id = meeting.id;
  const { mutate: editMeeting } = useEditMeeting();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<CreateMeetingRequest>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);

  useEffect(() => {
    if (meeting) {
      setEditData({
        title: meeting.title,
        locationId: meeting.locationId,
        latitude: meeting.latitude,
        longitude: meeting.longitude,
        address: meeting.address,
        meetingDateTime: meeting.meetingDateTime,
        maxCount: meeting.maxCount,
        category: meeting.category,
        content: meeting.content,
        thumbnail: meeting.thumbnail,
      });
    }
  }, [meeting]);

  const backToReadOnly = () => {
    if (!meeting) return;
    setEditData({
      title: meeting.title,
      locationId: meeting.locationId,
      latitude: meeting.latitude,
      longitude: meeting.longitude,
      address: meeting.address,
      meetingDateTime: meeting.meetingDateTime,
      maxCount: meeting.maxCount,
      category: meeting.category,
      content: meeting.content,
    });
    setIsEditMode(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const updateLocation = (
    locationId: string,
    latitude: string,
    longitude: string,
    address: string
  ) => {
    if (!editData) return;
    setEditData({
      ...editData,
      locationId: Number(locationId),
      latitude: Number(latitude),
      longitude: Number(longitude),
      address,
    });
  };

  const handleEdit = () => setIsEditMode(true);
  const handleCancel = () => backToReadOnly();
  const handleSave = () => {
    if (!id || !editData) return;
    console.log({ editData });
    editMeeting(
      { id: id.toString(), body: editData },
      {
        onSuccess: updated => {
          alert('게시물이 정상적으로 수정되었습니다.');
          setEditData({
            title: updated.title,
            locationId: updated.locationId,
            latitude: updated.latitude,
            longitude: updated.longitude,
            address: updated.address,
            meetingDateTime: updated.meetingDateTime,
            maxCount: updated.maxCount,
            category: updated.category,
            content: updated.content,
          });
          setIsEditMode(false);
        },
        onError: () => {
          alert('수정 중 오류가 발생했습니다.');
        },
      }
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSearchPlace = (place: PlaceDetail) => {
    setSelectedPlace(place);
    updateLocation(place.id, place.y, place.x, place.address_name);
    closeModal();
  };

  const handleToggleCategory = (categoryName: string) => {
    if (!editData) return;
    if (editData.category.includes(categoryName)) {
      setEditData({
        ...editData,
        category: editData.category.filter(c => c !== categoryName),
      });
    } else {
      setEditData({
        ...editData,
        category: [...editData.category, categoryName],
      });
    }
  };

  if (!editData) return <div>데이터를 불러올 수 없습니다.</div>;

  if (!isEditMode) {
    return (
      <DetailPageLayout
        meeting={meeting}
        buttonLabel="수정"
        onClick={handleEdit}
      />
    );
  }

  return (
    <>
      <div className="flex justify-center px-16 py-10">
        <div className="w-full max-w-5xl px-14">
          <form
            onSubmit={e => e.preventDefault()}
            className="flex gap-x-8 justify-center"
          >
            <div className="space-y-4">
              <FormField
                label="제목"
                type="text"
                value={editData.title}
                name="title"
                onChange={handleInputChange}
                minLength={1}
                maxLength={60}
              />
              <FormField
                label="모임 날짜"
                type="datetime-local"
                value={editData.meetingDateTime}
                name="meetingDateTime"
                onChange={handleInputChange}
                min={getLocalDateTime()}
                max={getOneYearLaterDateTime()}
              />
              <FormField
                label="모임 인원"
                type="number"
                value={editData.maxCount === 0 ? '' : editData.maxCount}
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
                  value={selectedPlace?.address_name || editData.address}
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
              <div>
                <label className="font-bold">카테고리</label>
                <Categories
                  selectedCategories={editData.category}
                  toggleCategory={handleToggleCategory}
                  size="xs"
                />
              </div>
              <div>
                <label className="font-bold">내용</label>
                <textarea
                  name="content"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  value={editData.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <img
                  src={meeting.thumbnail || 'image/upload_image.webp'}
                  alt="Thumbnail"
                  className="w-[280px] h-[178.48px] object-cover rounded-3xl"
                />
              </div>
              <div className="mt-4">
                <Map
                  center={{
                    lat: editData.latitude,
                    lng: editData.longitude,
                  }}
                  className="w-[280px] h-[280px]"
                  level={5}
                >
                  <MapMarker
                    position={{
                      lat: editData.latitude,
                      lng: editData.longitude,
                    }}
                  />
                </Map>
              </div>
              <div className="flex justify-end mt-auto gap-x-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleCancel}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  저장
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <KakaoMapModal onClose={closeModal} onSearch={handleSearchPlace} />
      )}
    </>
  );
};

export default PostEditPage;