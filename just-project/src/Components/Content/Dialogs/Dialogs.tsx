import React, { useEffect, useState } from 'react';
import { reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxMessageForm } from './MessageForm';
import { Message } from "./Message";
import { compose } from 'redux';
import { WithClearProfileData, WithPaginatorVisibility, withRedirectToLogin } from '../../HOCS/Hocs';
import { chatUsersSelector } from '../../../redux/selectores/dialogs-selector';
import { dialogsActions } from '../../../redux/dialogs-reducer';


const setChatUsers = dialogsActions.setChatUsers
export type ValueDataType = { message: string }
const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
const Dialogs: React.FC = React.memo(() => {

    const scrollToTop = () => {
        let d = document.getElementById('dd')
        d && d.scrollTo({ top: d.scrollHeight - d.clientHeight, behavior: "smooth" })
    }

    const chatUsers = useSelector(chatUsersSelector)
    const dispatch = useDispatch();
    useEffect(() => {
        ws.addEventListener('message', (e) => {
            dispatch(setChatUsers(JSON.parse(e.data)))
            scrollToTop()

        });
    }, []);
    const onSubmit = (value: ValueDataType) => {
        if (value.message && value.message.length) {
            ws.send(value.message);
            dispatch(reset('dialogs'))
        }
    };
    return (
        <div style={{ height: '400px', overflowY: 'auto', marginRight: '40px' }} id={'dd'}>
            <div >
                {chatUsers.map((chatUser, index) => <Message chatUser={chatUser} key={index} />)}
                <div>
                    <ReduxMessageForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
})
export default compose<React.ComponentType>(WithClearProfileData, WithPaginatorVisibility, withRedirectToLogin)(Dialogs) 
