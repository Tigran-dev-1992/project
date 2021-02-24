import React, { useEffect} from 'react';
import { reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxMessageForm } from './MessageForm';
import { Message } from "./Message";
import { compose } from 'redux';
import { WithClearProfileData, WithPaginatorVisibility, withRedirectToLogin } from '../../HOCS/Hocs';
import { chatUsersSelector } from '../../../redux/selectores/dialogs-selector';
import { creatChat, deleteChat, sendMessage } from '../../../redux/dialogs-reducer';




export type ValueDataType = { message: string }
const Dialogs: React.FC = () => {
    console.log('>>message')
    const dispatch = useDispatch();
    const chatUsers = useSelector(chatUsersSelector)
    useEffect(() => { 
        dispatch(creatChat())
        return () => {
            dispatch(deleteChat())
        }
    }, []);
        useEffect(() => {
            scrollToTop()
        }, [chatUsers]);

    const scrollToTop = () => {
        let d = document.getElementById('dd')
        d && d.scrollTo({ top: d.scrollHeight - d.clientHeight, behavior: "smooth" })
    }
  
    const onSubmit = (value: ValueDataType) => {
        if (value.message && value.message.length) {
            sendMessage(value.message)
            dispatch(reset('dialogs'))
        }
    };
    
    return (
     <div style={{ height: '700px', overflowY: 'auto', marginRight: '40px' } } id="dd">
            <div>
                {chatUsers?.map(chatUser=><Message chatUser={chatUser} key={chatUser.id}/>)} 
              
                <div>
                    <ReduxMessageForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}
export default compose<React.ComponentType>(WithClearProfileData, WithPaginatorVisibility, withRedirectToLogin)(Dialogs) 
