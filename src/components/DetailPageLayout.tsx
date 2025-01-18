import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Categories from '../components/Categories';
import type { CreateMeetingResponse } from '../types/Meeting';
import FormField from '../components/FormField';
import { formatDate } from '../utils/formatDate';

const DetailPageLayout = ({
  meeting,
  buttonLabel,
  onClick,
}: {
  meeting: CreateMeetingResponse;
  buttonLabel: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex justify-center px-16 py-10">
      <div className="w-full max-w-5xl px-14">
        <h1 className="text-2xl font-bold mb-6 text-center">{meeting.title}</h1>
        <div className="flex gap-x-8 justify-center">
          <div className="space-y-4">
            <FormField
              label="모임 날짜"
              type="datetime-local"
              value={formatDate(meeting.meetingDateTime)}
              name="meetingDateTime"
              readOnly
            />
            <FormField
              label="모임 인원"
              type="number"
              value={meeting.maxCount}
              name="maxCount"
              readOnly
            />
            <FormField
              label="주소"
              type="text"
              value={meeting.address}
              name="address"
              readOnly
            />
            <div className="form-control">
              <div className="label">
                <span className="label-text font-bold">카테고리</span>
              </div>
              <Categories
                selectedCategories={meeting.category}
                size="xs"
                readOnly
              />
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-bold">내용</span>
              </div>
              <div className={`p-3 rounded-md bg-gray-50 w-[320px] text-sm`}>
                {meeting.content}
              </div>
            </label>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div>
              <img
                src={meeting.thumbnail || '/image/thumbnail_default.webp'}
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
                className="w-[320px] h-[280px]"
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
            <div className="flex justify-end ml-auto mt-10">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClick}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageLayout;
