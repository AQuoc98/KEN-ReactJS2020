
import  { ReactNode } from 'react';

export interface INotificationState {
    isNotification:boolean,
    typeNotification:string,
    message?:string|ReactNode,
    description?:string|ReactNode
}
