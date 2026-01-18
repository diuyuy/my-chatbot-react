import { ROUTER_PATH } from '@/constants/router-path'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function IndexPage(): React.JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(ROUTER_PATH.CONVERSATION)
  }, [navigate])

  return <></>
}
