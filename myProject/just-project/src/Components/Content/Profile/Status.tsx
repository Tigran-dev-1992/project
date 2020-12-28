import React, { useState, useEffect } from 'react'
import styles from './Profile.module.css'

type PropsType = {
    status: string | undefined
    setUserStatus: (status: string | string) => void
    showEditButtons: boolean
}

export const Status: React.FunctionComponent<PropsType> = ({ status, setUserStatus, showEditButtons }) => {
    useEffect(() => { setStatus(status) }, [status])
    let [editMode, setEditMode] = useState(false)

    let updateStatus = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        setUserStatus(e.target.value)
    }

    let [inputValue, setStatus] = useState(status)

    let setStatusValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)

    }

    return (
        <div className={showEditButtons ? styles.statusCursor : ""}>
            {showEditButtons
                ? <div>
                    {editMode
                        ? <div>
                            <input onChange={(e) => setStatusValue(e)} autoFocus={true} onBlur={(e) => updateStatus(e)} value={inputValue} />
                        </div>
                        : <div onClick={() => setEditMode(true)}>
                            <span>{status || '-----'}</span>
                        </div>
                    }
                </div>
                : <div>
                    {status || 'I will write status after sometime...'}
                </div>
            }
        </div>
    )
}
export default Status