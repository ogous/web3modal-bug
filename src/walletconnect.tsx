'use client'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, useWeb3ModalEvents } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import {Toaster, toast} from 'react-hot-toast'

export default function WalletConnectProvider({ children }: { children: React.ReactNode }) {
    const chains = [mainnet]
    const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID
    useWeb3ModalEvents((e) => toast.success(e.name + ' triggered'))

    if (!projectId) {
        console.error(
            'Walletconnect Project ID is missing in current environment'
        )
        return
    }

    const { publicClient } = configureChains(chains, [
        w3mProvider({ projectId })
    ])

    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, chains }),
        publicClient
    })
    const ethereumClient = new EthereumClient(wagmiConfig, chains)
  

    return <>
        <WagmiConfig config={wagmiConfig}>
            {children}
        </WagmiConfig>
        <Toaster />
        <Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
        />
    </>
}