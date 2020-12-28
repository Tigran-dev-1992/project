import React from 'react'
import loader from '../../images/preLoader.gif'
import styles from './PreLoader.module.css'



const PreLoader = () => {
    return(
        <div  className = {styles.preLoader}>
<img src={loader} />
        </div>
    )
}


export default PreLoader