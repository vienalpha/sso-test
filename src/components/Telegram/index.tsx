import React, {useEffect} from 'react'

function LoginTelegram() {
  const handleLoginTelegram = () => {
    let option = {
      bot_id: process.env.REACT_APP_TELE_BOT_ID,
    }
    typeof window.Telegram.Login.auth !== 'undefined' &&
      window.Telegram.Login.auth(option, handleTelegramResponse)
    return false
  }

  /**
   * Handle send Init User to parent
   * @param initDataUser data user when login success
   */
  const handleTelegramResponse = async (initDataUser: any) => {
    let data = {
      provider: 'telegram',
      data: initDataUser,
    }
    window.parent.postMessage(data, '*')
  }

  useEffect(() => {
    window.onmessage = function (e: any) {
      // inside the iframe
      if (e.data.provider == 'telegram') {
        handleLoginTelegram()
      }
    }
  }, [])

  return <div></div>
}

export default LoginTelegram
