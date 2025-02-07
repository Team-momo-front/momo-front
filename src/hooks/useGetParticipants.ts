import { useQuery } from '@tanstack/react-query';
import { getParticipants } from '../api/meeting';
import type { Participants } from '../types/User';

export function useGetParticipants(id: number) {
  return useQuery<Participants[]>({
    queryKey: ['get-participants', id],
    queryFn: () => getParticipants(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}
