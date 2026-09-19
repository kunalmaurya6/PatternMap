import {api} from '../api/axios'


interface userData{
    username:string,
    email:string,
    password:string
}
export const login=async (data:userData)=>{
    return await api.post('/auth/login',data);
}

export const sinup=async (data:userData)=>{
   return await api.post('/auth/signup',data)
}

export const resetPassword=(_email:string)=>{
    // Reset passwords
}

export const changePassword=(_data:userData)=>[
    // change passowrd
]

export const ssoLogin=(_data:userData)=>{
    // sso login
}