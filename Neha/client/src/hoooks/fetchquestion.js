import { useEffect, useState } from "react";
import { getserverdata } from "../helper";
import { useDispatch } from "react-redux";
import { startExamAction } from "../redux/result_reducer";


export default function useFetchQuestion() {

  const dispatch = useDispatch();

  const [getData, setGetData] = useState({
    isLoading: true,
    apiData: [],
    serverError: null
  });
  useEffect(() => {

    setGetData(prev => ({
      ...prev,
      isLoading: true
    }));
    // async function to get backend data
    (async () => {
      try {
        const data = await getserverdata(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`
        );
        console.log(data);
        if (data && data.length > 0) {

          const { questions, answers } = data;

          setGetData(prev => ({
            ...prev,
            isLoading: false,
            apiData: data
          }));
          // send data to redux store
          dispatch(
            startExamAction({
              questions,
              answers
            })
          );

        } else {
          throw new Error("No Question Available");
        }
      } catch (error) {
        setGetData(prev => ({
          ...prev,
          isLoading: false,
          serverError: error.message
        }));

      }


    })();


  }, [dispatch]);


  return [getData, setGetData];

}