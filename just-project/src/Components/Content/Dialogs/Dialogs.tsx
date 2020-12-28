import React from 'react'
import { WithPaginatorVisibility, withRedirectToLogin, WithClearProfileData } from '../../HOCS/Hocs'
import { compose } from 'redux'

const Dialogs = (   ) => {
    return (
        <div>
            <h1>
 Herr will be Dialogs
            </h1>
           
        </div>
    )
}
export default compose<React.ComponentType>(WithClearProfileData, WithPaginatorVisibility,withRedirectToLogin)(Dialogs) 