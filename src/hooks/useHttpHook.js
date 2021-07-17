import { useCallback, useEffect, useRef } from "react";


export const useHttpClient = () =>{
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController)
        try {
          const response = await fetch(url,{ method, body, headers, signal: httpAbortController.signal});
  
          const responseData = await response.json();
          activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortController)
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          return responseData
        } catch (error) {
          throw error;
        }
    }, []);

    useEffect(() => {
        return activeHttpRequests.current.forEach(abrtCtlr => abrtCtlr.abort())
    }, [])

    return { sendRequest }
}