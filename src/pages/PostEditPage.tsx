import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Categories from '../components/Categories';
import useEditMeeting from '../hooks/useEditMeeting';
import type {
  CreateMeetingRequest,
  CreateMeetingResponse,
} from '../types/Meeting';

const PostEditPage = ({ meeting }: { meeting: CreateMeetingResponse }) => {
  const id = meeting.id;
  const { mutate: editMeeting } = useEditMeeting();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<CreateMeetingRequest>();

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

  const handleEdit = () => setIsEditMode(true);
  const handleCancel = () => backToReadOnly();
  const handleSave = () => {
    if (!id || !editData) return;
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
  // ----------------------------------------------------------------------
  // 1) 읽기 전용 UI
  // ----------------------------------------------------------------------
  if (!isEditMode) {
    return (
      <div className="flex justify-center px-16 py-10">
        <div className="w-full max-w-5xl px-14">
          <div className="flex gap-x-8 justify-center">
            <div className="space-y-4">
              <div>
                <label className="font-bold">제목</label>
                <div className="mt-1 p-2 border rounded-md bg-gray-50">
                  {meeting.title}
                </div>
              </div>
              <div>
                <label className="font-bold">모임 날짜</label>
                <div className="mt-1 p-2 border rounded-md bg-gray-50">
                  {meeting.meetingDateTime}
                </div>
              </div>
              <div>
                <label className="font-bold">모임 인원</label>
                <div className="mt-1 p-2 border rounded-md bg-gray-50">
                  {meeting.maxCount}명
                </div>
              </div>
              <div>
                <label className="font-bold">장소</label>
                <div className="mt-1 p-2 border rounded-md bg-gray-50">
                  {meeting.address}
                </div>
              </div>
              <div>
                <label className="font-bold">카테고리</label>
                <div className="mt-1">
                  <Categories
                    selectedCategories={meeting.category}
                    size="xs"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="font-bold">내용</label>
                <div className="mt-1 p-2 border rounded-md bg-gray-50 whitespace-pre-wrap">
                  {meeting.content}
                </div>
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
                    lat: meeting.latitude,
                    lng: meeting.longitude,
                  }}
                  className="w-[280px] h-[280px]"
                  level={5}
                >
                  <MapMarker
                    position={{
                      lat: meeting.latitude,
                      lng: meeting.longitude,
                    }}
                  />
                </Map>
              </div>
              <div className="flex justify-end mt-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEdit}
                >
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 2) 편집 모드 UI
  // ----------------------------------------------------------------------
  return (
    <div className="flex justify-center px-16 py-10">
      <div className="w-full max-w-5xl px-14">
        <form
          onSubmit={e => e.preventDefault()}
          className="flex gap-x-8 justify-center"
        >
          <div className="space-y-4">
            <div>
              <label className="font-bold">제목</label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                value={editData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="font-bold">모임 날짜</label>
              <input
                type="datetime-local"
                name="meetingDateTime"
                className="input input-bordered w-full"
                value={editData.meetingDateTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="font-bold">모임 인원</label>
              <input
                type="number"
                name="maxCount"
                min={2}
                max={99}
                className="input input-bordered w-full"
                value={editData.maxCount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="font-bold">장소</label>
              <input
                type="text"
                name="address"
                className="input input-bordered w-full"
                value={editData.address}
                onChange={handleInputChange}
              />
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
  );
};

export default PostEditPage;
