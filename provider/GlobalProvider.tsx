import React, { createContext, useState, useContext, useEffect, useMemo, PropsWithChildren, lazy } from 'react'

import { useRouter } from 'next/router'
import { CartProvider, ShopifyProvider } from '@shopify/hydrogen-react'

import { ViewportProvider } from './ViewportProvider'
import { ScrollProvider } from './ScrollProvider'
import { DataProvider } from './DataProvider'
import { L10nProvider } from './L10nProvider'
import { PublicationProvider } from './PublicationProvider'

export type PanelType = {
  key: string
} & Record<string, any>

type GlobalContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  client: boolean
  menu: boolean
  setMenu: (menu: boolean) => void
  panel: PanelType | null
  setPanel: (panel: any) => void
  cart: boolean
  setCart: (cart: boolean) => void
  isShowcaseMarket: boolean
  search: boolean
  setSearch: (search: boolean) => void
  overlay: boolean
  setOverlay: (overlay: boolean) => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export type BaseProviderProps = PropsWithChildren<{
  store: any
  pageProps: {
    [key: string]: any
  }
}>

const PreviewProvider = lazy(() => import('./PreviewProvider'))

export const GlobalProvider = ({ store, pageProps, children }: BaseProviderProps) => {
  const router = useRouter()

  const [client, setClient] = useState(false)
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(false)
  const [panel, setPanel] = useState<any>()
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)
  const [overlay, setOverlay] = useState(false)

  const isShowcaseMarket = useMemo(() => store.locale === 'international', [store])

  useEffect(() => {
    setClient(true)
    setLoading(false)
    router.events.on('routeChangeStart', (path) => {
      if (path === window.location.pathname) setMenu(false)
      setLoading(true)
    })
    router.events.on('routeChangeError', () => setLoading(false))
    router.events.on('routeChangeComplete', () => setLoading(false))
  }, [])

  useEffect(() => {
    if (!overlay) {
      setMenu(false)
      setPanel(null)
      setCart(false)
      setSearch(false)
    }
  }, [overlay])

  useEffect(() => {
    if (menu) setMenu(false)
    if (cart) setCart(false)
    if (panel) setPanel(null)
    if (cart) setCart(false)
    if (search) setSearch(false)
  }, [router.asPath?.split('#')[0]])

  useEffect(() => {
    if (panel) setMenu(false)
    if (menu) setCart(false)
    if (cart) setMenu(false)
    if (search) setMenu(false)

    if (panel || menu || cart || search) setOverlay(true)
    else setOverlay(false)
  }, [panel, menu, cart, search])

  const providers = [ShopifyProvider, DataProvider, ViewportProvider, ScrollProvider, L10nProvider, PublicationProvider, CartProvider]
  if (pageProps.previewToken) providers.push(PreviewProvider as any)
  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        client,
        menu,
        setMenu,
        panel,
        setPanel,
        isShowcaseMarket,
        cart,
        setCart,
        search,
        setSearch,
        overlay,
        setOverlay
      }}

    >
      { providers.reverse().reduce((children, Provider) => (
        <Provider
          languageIsoCode='EN'
          countryIsoCode='FR'
          storeDomain={ `${process.env.NEXT_PUBLIC_SHOPIFY_STORE}.myshopify.com` }
          storefrontToken={ `${process.env.NEXT_PUBLIC_SHOPIFY_TOKEN}` }
          storefrontApiVersion='2024-07'
          store={ store }
          pageProps={ pageProps }
          onLineAddComplete={ () => setCart(true) }
        > { children }
        </Provider>), children) }
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) throw Error('useGlobalContext must be used inside a `GlobalProvider`')
  return context
}
