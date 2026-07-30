import { createSlice} from "@reduxjs/toolkit"
import Result from "../components/Result"


export const Resultreducer = createSlice({
    name:Result,
    initialState:
    {
    userId:null,
    Result:[]
},
reducers:
{
    setuserId: (state, action) => {
        state.userId = action.payload
    }
}
})
export const {setuserId} = Resultreducer.actions;
export default  Resultreducer.reducer;