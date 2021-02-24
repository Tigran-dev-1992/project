import React, { useState } from 'react';
import { createField } from '../../commons/CreateField';
import { Input } from '../../commons/Input';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ValueDataType } from './Dialogs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';



type PropsType = {
    
}

export const MessageForm: React.FC<InjectedFormProps<ValueDataType,PropsType>&PropsType> =React.memo(({ handleSubmit}) => {
    // const status = useSelector((state:RootState)=>state.dialogs.status)
    const [message, setMessage] = useState('');
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField('message', 'enter new message', [], Input, {}, '')}
                <button onSubmit={() => setMessage('')} disabled={false}>Send</button>
            </form>

        </div>
    );
});
export const ReduxMessageForm = reduxForm<ValueDataType,PropsType>({ form: 'dialogs'})(MessageForm)
