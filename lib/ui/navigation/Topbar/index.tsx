import styled from 'styled-components'

import { Spacer } from '../../layout/Spacer'
import { Burger } from './Burger'
import { Backdrop } from '../../modal/Backdrop'
import { useBoolean } from '../../hooks/useBoolean'

const Container = styled.div`
  width: 100%;
  padding: 12px 20px;
  display: grid;
  grid-template-columns: 28px 1fr 28px;
  align-items: center;
  justify-items: center;
`

const Cover = styled(Backdrop)`
  justify-content: flex-start;
`

interface Props {
  renderSidebar: () => React.ReactNode
}

export const Topbar = ({ renderSidebar }: Props) => {
  const [isSidebarOpen, { toggle }] = useBoolean(false)

  return (
    <>
      {isSidebarOpen && <Cover onClose={toggle}>{renderSidebar()}</Cover>}
      <Container>
        <Burger onClick={toggle} />
      </Container>
      <Spacer height={20} />
    </>
  )
}