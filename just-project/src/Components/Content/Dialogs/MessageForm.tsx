import React, { useState } from 'react';
import { createField } from '../../commons/CreateField';
import { Input } from '../../commons/Input';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ValueDataType } from './Dialogs';

export const MessageForm: React.FC<InjectedFormProps<ValueDataType>> =React.memo(({ handleSubmit }) => {
    const [message, setMessage] = useState('');
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField('message', 'enter new message', [], Input, {}, '')}
                <button onSubmit={() => setMessage('')}>Send</button>
            </form>

        </div>
    );
});
export const ReduxMessageForm = reduxForm<ValueDataType>({ form: 'dialogs'})(MessageForm)
