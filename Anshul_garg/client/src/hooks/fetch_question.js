import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Action from '../redux/question_reducer';

export const useFetchQuestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        (async () => {
            try {
                const response = await fetch('http://localhost:8080/questions');
                const data = await response.json();

                
                if (Array.isArray(data) && data.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false, apiData: data }));
                    
                    dispatch(Action.startExamAction({ queue: data, answers: [] }));
                } else {
                    throw new Error("No Questions Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false, serverError: error }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];

    
};

export const moveNextQuestion=()=> async(dispatch)=> {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}

export const movePrevQuestion=()=> async(dispatch)=> {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error)
    }
}