
import  { ReactNode } from 'react';

export interface ILoginState {
     message:any,
     result:any,
}

export interface ILoginCredentials {
     username: string,
     password: string
   }
   export interface IRegisterCredentials {
       firstName: string,
       lastName:string,
       email:string,
       password:string,
   }
   