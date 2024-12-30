import { Children, useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null

}
export const authContext = createContext(initialState)

const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN_START':
            return {
                user:null,
                token:null
            };
            case 'LOGIN_SUCCESS':
                return {
                    user:action.payload.user,
                    token:action.payload.token
                };
                case 'LOGOUT':
                    return{
                        user:null,
                        token:null
                    }
        default:
            return state
    }
}

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,initialState)
    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(state.user))
        localStorage.setItem('token',state.token)
    }, [state])
    useEffect(() => {
        if (!state.user && !state.token) {
            navigate('/login'); // Redirect to login page if logged out
        }
    }, [state.user, state.token, navigate]);
    return <authContext.Provider 
    value={{
        user:state.user,
        token:state.token,
        dispatch}}>
        {children}
    </authContext.Provider>
}