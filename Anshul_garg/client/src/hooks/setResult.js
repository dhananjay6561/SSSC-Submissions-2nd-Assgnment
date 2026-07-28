import * as Action from '../redux/result_reducer';

export const postServerData = (answersData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:8080/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answersData)
        });
        const data = await response.json();
        
        
        dispatch(Action.pushResultAction(data));
    } catch (error) {
        console.log(error);
    }
};