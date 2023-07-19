import { useEffect, useState } from "react";

export const useFetch = ( url ) => {

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const getFetch = async() => {


    setState({
      ...state,
      isLoading: true,
    });


    try {
      const resp = await fetch(url);
      const data = await resp.json();

      setTimeout(() => {

        setState({
          data,
          isLoading: false,
          hasError: null,
        })
      }, 1000);

    } catch (error) {

      setTimeout(() => {

        setState({
          data: null,
          isLoading: false,
          hasError: error,
        })
      }, 1000);
    }
  
  }

  const onReload = () => {
    getFetch();
  }

  useEffect(() => {
    getFetch();

  }, [url])

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    onReload,
  };
}


