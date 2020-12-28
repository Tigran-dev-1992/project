import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import styles from '../Content/Users/Users.module.css';



export const Select: React.FunctionComponent<WrappedFieldProps> = React.memo((props) => {
    const { meta, input, ...restProps } = props;
    return (
        <div >
            <select className={styles.selectStyle} {...input} {...restProps} name='friend'>
                <option value="all">All users</option>
                <option value="true">Followed users</option>
                <option value="false">Unfollowed users</option>
            </select>
        </div>
    );
});
