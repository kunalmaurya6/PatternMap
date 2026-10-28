import api from "./api";

interface submitAnaytics{
    data:string;
    prompt:string;
    language:string;
}

export const submitAnalytics = async (data:submitAnaytics)=>{
   return await api.post('/upload-analytics',data);
};