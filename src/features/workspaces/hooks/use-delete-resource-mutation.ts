import { QUERY_KEYS } from '@/constants/query-keys'
import { ROUTER_PATH } from '@/constants/router-path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { deleteResourceById } from '../api/rag.api'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useDeleteResourceMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (resourceId: string) => deleteResourceById(resourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.getRagQueryKeys()
      })
      navigate(ROUTER_PATH.WORKSPACE)
      toast.success('리소스가 성공적으로 삭제되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(`리소스 삭제에 실패했습니다: ${error.message}`)
    }
  })
}
