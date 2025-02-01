import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMeeting } from '../api/meeting';
import type {
  // CreateMeetingRequest,
  CreateMeetingResponse,
} from '../types/Meeting';

const useEditMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: FormData }) =>
      editMeeting(id, body),
    onSuccess: (updatedData, variables) =>
      queryClient.setQueryData<CreateMeetingResponse>(
        ['meetingDetail', variables.id],
        updatedData
      ),
  });
};

export default useEditMeeting;
