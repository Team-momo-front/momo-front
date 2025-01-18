// import { useMutation } from '@tanstack/react-query';
// import axiosInstance from './axiosInstance';

// type JoinUserForm = {
//   email: string;
//   password: string;
//   nickname: string;
//   phone: string;
// };

// const joinUser = async (form: JoinUserForm) => {
//   const response = await axiosInstance.post('/api/v1/users/signup', {
//     email: form.email,
//     password: form.password,
//     nickname: form.nickname,
//     phone: form.phone.replace(/[^0-9]/g, ''),
//   });
//   return response.data;
// };

// const useJoinUser = () => {
//   return useMutation(joinUser, {
//     onMutate: () => {
//       return
//     },
//     onSuccess: data => {
//       // 성공적으로 요청이 완료된 후 처리
//       alert(data);
//       navigate('/verify-email-code');
//     },
//     onError: (err: any) => {
//       // 오류가 발생했을 때 처리
//       if (err.response) {
//         if (err.response.status === 409) {
//           const field = err.response.data.field;
//           setJoinError(`이미 사용 중인 ${field}입니다.`);
//         } else if (err.response.status === 400) {
//           setJoinError(err.response.data.message);
//         }
//       }
//     },
//   });
// };

// export default useJoinUser;
