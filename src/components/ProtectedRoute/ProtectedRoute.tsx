import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return (
      <dialog id="my_modal_5" className="modal modal-open sm:modal-middle ">
        <div className="modal-box flex flex-col items-center gap-2">
          <p className="py-3 font-bold">로그인 후 이용해주세요.</p>
          <Link to="/login">
            <button type="button" className="btn btn-primary">
              로그인 하러 가기
            </button>
          </Link>
        </div>
      </dialog>
    );
  }

  return children;
};

export default ProtectedRoute;
