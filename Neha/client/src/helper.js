import { useSelector } from "react-redux";
import {Navigate} from 'react-router-dom';
import axios from "axios";

export function attempts_number(result){
    return result.filter(r=> r !== undefined).length;
}
export function score_number(result, answer, score) {
    return result
        .map((element, i) => answer[i] === element)
        .filter(Boolean)
        .length * score;
}

export function flagResult(totalscore,score){
    return (totalscore * 50/80)<score;
}
export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userId);

    return auth 
        ? children 
        : <Navigate to="/" replace={true} />;
}
export async function getserverdata(url,callback){
    const data= await (await axios.get(url))?.data;
    return callback ? callback(data): data;
}
export async function postserverdata(url,result,callback){
    const data= await (await axios.post(url))?.data;
    return callback ? callback(data): data;
}
