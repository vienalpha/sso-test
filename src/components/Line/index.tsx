import React, {useEffect, useState} from 'react'
import liff from '@line/liff'

function LoginLine() {
  const [lineInitSuccess, setLineInitSucccess] = useState<boolean>(false)

  const handleLoginLine = () => {
    if (!liff?.isLoggedIn()) {
      liff.login({
        redirectUri: window.origin,
      })
    }
  }
  /**
   * Check access token when login LINE success and send to parent
   */
  typeof window !== 'undefined' &&
    liff &&
    liff?.ready.then(() => {
      if (liff && liff?.id && liff?.getAccessToken()) {
        let data = {
          provider: 'line',
          data: liff.getAccessToken(),
        }
        window.opener && window.opener.postMessage(data, '*') // send access token to parent
        window.close() // close window after send token
      }
    })

  useEffect(() => {
    //init LINE LIFF
    liff
      .init({liffId: process.env.REACT_APP_LINE_ID || ''})
      .then(() => setLineInitSucccess(!lineInitSuccess))
    /**
     * Listen event from parent
     * @param e
     */
  }, [])

  useEffect(() => {
    //check query and login Line
    if (window.location.search.includes('provider=line') && liff.id) {
      handleLoginLine()
    }
  }, [JSON.stringify(liff.id), lineInitSuccess])
  return <div></div>
}

export default LoginLine
