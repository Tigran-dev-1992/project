import React from 'react'
import loader from '../../images/preLoader.gif'
import styles from './PreLoader.module.css'



const SmallPreLoader = () => {
    return(
        <div >
<img src={loader} className = {styles.small}/>
        </div>
    )
}


export default SmallPreLoader