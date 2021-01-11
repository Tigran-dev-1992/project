import React from 'react';
import { chatUsersType } from '../../../redux/dialogs-reducer';
import photos from '../../../images/userPhoto.jpg'
import { NavLink } from 'react-router-dom';


export const Message: React.FC<{ chatUser: chatUsersType }> = React.memo(({ chatUser }) => {
    return (
        <div >
            <NavLink to={`/profile/${chatUser.userId}`}>
                <img src={chatUser.photo || photos} style={{ height: '50px', width: "50px" }} />
            </NavLink>
            {chatUser.message}
        </div>
    );
});
