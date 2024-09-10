import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const responseData = response.json();

    if(!response.ok) {
        throw new Error(responseData.message || "Something went wrong");
    }

    return responseData;
}

// Custom hook
export default function useHttp(url, config) {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData();
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try {
            const responseData = await sendHttpRequest(url, {...config, body: data});
            setData(responseData);
        } catch(error) {
            setError(error.message);
        }

        setIsLoading(false);
    }, [url, config]); // if either of them change, we would need to create a new function object

    useEffect(() => {
        if (!config || (!config.method || config.method == "GET")) {
            sendRequest() // send the http request only for fetching avaiable meal offers upon page load
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };

}