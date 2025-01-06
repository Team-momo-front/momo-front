import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';
import Categories from '../components/Categories';
import Header from '../components/Header/Header';
import { posts } from '../mocks/posts';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return;
  const post = posts.find(post => post.id === id);

  if (post === undefined) return;

  const isHost = true;
  const hasApplied = true;

  return (
    <>
      <Header />
      <div className="flex justify-center px-16 py-10">
        <div className="w-full max-w-5xl px-14">
          <h1 className="text-2xl font-bold mb-6 text-center">{post.title}</h1>
          <div className="flex gap-x-8 justify-center">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">모임 날짜</span>
                </label>
                <input
                  type="datetime-local"
                  value={post.meetingDate}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">모임 인원</span>
                </label>
                <input
                  type="number"
                  value={post.participationCount}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control gap-y-4">
                <div className="label">
                  <span className="label-text font-bold">장소</span>
                </div>
                <input
                  type="text"
                  value={post.title}
                  readOnly
                  className="input input-bordered"
                />
                <input
                  type="text"
                  value={post.location}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <div className="label">
                  <span className="label-text font-bold">카테고리</span>
                </div>
                <Categories
                  selectedCategories={post.categories}
                  size="xs"
                  readOnly
                />
              </div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text font-bold">내용</span>
                </div>
                <textarea
                  className="textarea textarea-bordered max-w-sm text-sm"
                  rows={4}
                  value={post.content}
                  readOnly
                />
              </label>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <img
                  src={
                    '/image/placeholder_thumbnail.webp'
                    // post.thumbnail || 'image/thumbnail_default.webp'
                  }
                  alt="Thumbnail"
                  className="w-[280px] h-[178.48px] object-cover rounded-3xl"
                />
              </div>
              <div className="mt-4">
                <Map
                  center={{
                    lat: post.lat,
                    lng: post.lng,
                  }}
                  className="w-[280px] h-[280px]"
                  level={5}
                >
                  <MapMarker
                    position={{
                      lat: post.lat,
                      lng: post.lng,
                    }}
                  />
                </Map>
              </div>
              <div className="flex justify-end mt-auto">
                <button type="button" className="btn btn-primary">
                  {isHost ? '수정' : hasApplied ? '신청취소' : '신청'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
