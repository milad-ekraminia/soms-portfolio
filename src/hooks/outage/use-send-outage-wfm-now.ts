import { PostSendOutageWfmNow } from '@/services/outages/post-send-outage-wfm-now';
import { useMutation } from '@tanstack/react-query';

export const useSendOutageWfmNow = () => {
  return useMutation({
    mutationFn: PostSendOutageWfmNow,
  });
};
