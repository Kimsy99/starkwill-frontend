import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SideBar from '../src/components/SideBar.component'
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' }}),
    new InjectedConnector({ options: { id: 'argentX' }}),
  ]
  return (
    <StarknetConfig connectors={connectors}>
      <SideBar>
        <Component {...pageProps} />
      </SideBar>
    </StarknetConfig>
  )
}

export default MyApp
