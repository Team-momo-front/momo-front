import { KeyboardEvent, useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';
import { PlaceDetail } from '../../types/Post';

interface KakaoMapModalProps {
  onClose: () => void;
  onSearch: (place: PlaceDetail) => void;
}

const KakaoMapModal: React.FC<KakaoMapModalProps> = ({ onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [places, setPlaces] = useState<PlaceDetail[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [selectedPlaceDetail, setSelectedPlaceDetail] =
    useState<PlaceDetail | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSearch = () => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data as PlaceDetail[]);
        setMapCenter({
          lat: parseFloat(data[0].y),
          lng: parseFloat(data[0].x),
        });
      } else {
        setPlaces([]);
        alert('검색 결과가 없습니다.');
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        error => {
          alert('위치 정보를 가져올 수 없습니다.');
          console.error(error);
        }
      );
    } else {
      alert('위치 정보를 가져올 수 없습니다.');
    }
  };

  useEffect(() => {
    if (selectedPlace) {
      setMapCenter({
        lat: parseFloat(selectedPlace.y),
        lng: parseFloat(selectedPlace.x),
      });
    }
  }, [selectedPlace]);

  const handleSelectPlace = (place: PlaceDetail) => {
    setSelectedPlace(place);
    setSelectedPlaceDetail(place);
  };

  const handleMarkerClick = (place: PlaceDetail) => {
    setSelectedPlaceDetail(place);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[80%] h-[80%] rounded-lg overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-center gap-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="장소를 검색하세요"
              className="input input-bordered w-2/3 max-w-md"
            />
            <button onClick={handleSearch} className="btn btn-primary">
              검색
            </button>
            <button
              onClick={handleGetCurrentLocation}
              className="btn btn-social"
            >
              내 위치
            </button>
          </div>
          <div className="flex flex-1">
            <ul className="w-1/3 overflow-auto max-h-[calc(80%-8rem)] p-4 border-r">
              {places.map(place => (
                <li
                  key={place.id}
                  className={`p-2 hover:bg-primary/50 cursor-pointer ${
                    selectedPlace?.place_name === place.place_name &&
                    'bg-primary/50'
                  }`}
                  onClick={() => handleSelectPlace(place)}
                >
                  <h3 className="font-bold text-sm">{place.place_name}</h3>
                  <p className="text-xs text-gray-700">{place.address_name}</p>
                </li>
              ))}
            </ul>
            <div className="w-2/3">
              <Map
                center={mapCenter}
                style={{ width: '100%', height: '100%' }}
                level={3}
              >
                {places.map(place => (
                  <MapMarker
                    key={place.id}
                    position={{
                      lat: parseFloat(place.y),
                      lng: parseFloat(place.x),
                    }}
                    onClick={() => handleMarkerClick(place)}
                  />
                ))}
                {currentLocation && <MapMarker position={currentLocation} />}
                {selectedPlaceDetail && (
                  <CustomOverlayMap
                    position={{
                      lat: parseFloat(selectedPlaceDetail.y) + 0.0002,
                      lng: parseFloat(selectedPlaceDetail.x),
                    }}
                  >
                    <div className="bg-white text-xs rounded-lg border border-gray-400 space-y-2">
                      <div className="bg-primary p-2">
                        <div className="flex justify-between gap-x-4">
                          <p className="font-bold">
                            {selectedPlaceDetail.place_name}
                          </p>
                          <div
                            onClick={() => setSelectedPlaceDetail(null)}
                            className="font-bold"
                          >
                            ✕
                          </div>
                        </div>
                      </div>
                      <div className="px-2 text-gray-700">
                        {selectedPlaceDetail.address_name}
                      </div>
                      <div className="px-2 pb-2 flex justify-between items-center">
                        <Link
                          to={selectedPlaceDetail.place_url}
                          target="_blank"
                          className="hover:underline"
                        >
                          상세보기
                        </Link>
                        <button
                          className="btn btn-xs bg-primary"
                          onClick={() => onSearch(selectedPlaceDetail)}
                        >
                          선택하기
                        </button>
                      </div>
                    </div>
                    ;
                  </CustomOverlayMap>
                )}
              </Map>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KakaoMapModal;
