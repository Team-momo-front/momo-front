import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileRedirectModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    isModalOpen && (
      <dialog id="my_modal_5" className="modal modal-open">
        <div className="modal-box flex flex-col items-center gap-2 max-w-md h-[300px]">
          <div className="w-full h-[450px] flex flex-col justify-center items-center gap-10">
            <div className="font-bold text-lg text-center leading-8">
              생성된 프로필이 없습니다.
              <br />
              서비스 이용을 위해서 프로필을 생성해주세요.
            </div>
            <Link to="/create-profile">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsModalOpen(false)}
              >
                프로필 생성하러 가기
              </button>
            </Link>
          </div>
        </div>
      </dialog>
    )
  );
};

export default ProfileRedirectModal;
