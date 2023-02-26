import axios from 'axios'

import { getItem, KEY_ACCESS_TOKEN, removeItem } from './Localstoragemanager'

export const axiosclient= axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true
})

axiosclient.interceptors.request.use((request)=>{
            const accesstoken=getItem(KEY_ACCESS_TOKEN)
            request.headers['Authorization']=`Bearer ${accesstoken}`;

            return request;
        }
)

axiosclient.interceptors.response.use(
   async (response)=>{
        const data=response.data
        if(data.status ==='ok')
         {
            return data
         }

         const oroginalrequest= response.config
         const statuscode=data.statuscode
         const error=data.error

         if(statuscode=== 401 &&  oroginalrequest.url==='http://localhost:4000/auth/refresh'){
            removeItem(KEY_ACCESS_TOKEN)
            window.location.replace('/login' , '_self')
            return Promise.reject(error)
         }
         else if(statuscode === 401){
            console.log('jghgnhg')
            const response = await axiosclient.get('/auth/refresh')
            console.log('response from backend', response)
         }
    }
)
