import {
  ChatHistoryResponse,
  ChatParticipant,
  ChatRoomResponse,
} from '../types/Chat';
import { apiClient } from './apiClient';

const COMMON_URL = '/api/v1/chatrooms';

// 채팅방 목록 조회
export const getChatRoomList = async (): Promise<ChatRoomResponse[]> =>
  apiClient({ url: COMMON_URL, method: 'get' });

// TODO: 불필요한 API로 의견 통합 -> 삭제 예정
// 채팅방 생성
export const createChatRoom = async (
  meetingId: number
): Promise<ChatRoomResponse> =>
  apiClient({ url: `${COMMON_URL}/${meetingId}`, method: 'post' });

// 채팅방 조회
export const getChatRoom = async (roomId: number) =>
  apiClient({ url: `${COMMON_URL}/${roomId}`, method: 'get' });

// 채팅방 삭제 = 주최자 입장
export const deleteChatRoom = async (roomId: number) =>
  apiClient({ url: `${COMMON_URL}/${roomId}`, method: 'delete' });

// 채팅방 입장 = 모임 참가시 자동 입장된다.
export const joinChatRoom = async (roomId: number): Promise<ChatRoomResponse> =>
  apiClient({ url: `${COMMON_URL}/${roomId}/join`, method: 'post' });

// 채팅방 퇴장 = 모임 나가기
export const leaveChatRoom = async (
  roomId: number
): Promise<ChatRoomResponse> =>
  apiClient({ url: `${COMMON_URL}/${roomId}/leave`, method: 'post' });

// 채팅 기록 조회
export const getChatHistory = async (
  roomId: number
): Promise<ChatHistoryResponse[]> =>
  apiClient({
    url: `${COMMON_URL}/${roomId}/in`,
    method: 'post',
  });

// 채팅방 나가기 = 뒤로가기
export const getOutChatRoom = async (
  roomId: number
): Promise<ChatRoomResponse> =>
  apiClient({ url: `${COMMON_URL}/${roomId}/out`, method: 'post' });

// 채팅 참여자 조회
export const getChatParticipants = async (
  roomId: number
): Promise<ChatParticipant[]> =>
  apiClient({ url: `${COMMON_URL}/${roomId}/participants`, method: 'get' });

// 채팅 참여자 강퇴
export const withdrawChatParticipant = async (
  roomId: number,
  userId: number
): Promise<ChatRoomResponse> =>
  apiClient({
    url: `${COMMON_URL}/${roomId}/withdrawal/${userId}`,
    method: 'post',
  });
