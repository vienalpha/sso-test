import React, {useEffect, useState} from 'react'
import liff from '@line/liff'
import {Helmet, HelmetProvider} from 'react-helmet-async'
import LoginLine from './components/Line'
import LoginTelegram from './components/Telegram'

/**
 * declare Telegram global
 */
declare global {
  interface Window {
    Telegram: any
  }
}

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <script
            async
            src="https://telegram.org/js/telegram-widget.js?22"
            data-telegram-login={process.env.REACT_APP_TELE_BOT_USERNAME}
            data-auth-url={
              (typeof window !== 'undefined' && window.origin) || ''
            }
            data-request-access="write"></script>
        </Helmet>
        <header className="App-header"></header>
        <>
          <LoginLine />
          <LoginTelegram />
        </>
      </div>
    </HelmetProvider>
  )
}

export default App
