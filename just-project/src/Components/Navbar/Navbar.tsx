import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = ()=>{
    return (
        <div className = {styles.navbarItems}>
            <div ><NavLink to ='/profile' activeClassName={styles.selectedItem}>Profile</NavLink></div>
            <div><NavLink to ='/dialogs' activeClassName={styles.selectedItem}>Dialogs</NavLink></div>
            <div><NavLink to ='/users' activeClassName={styles.selectedItem}>Users</NavLink></div>
            <div><NavLink to ='/music' activeClassName={styles.selectedItem}>Music</NavLink></div>
            <div><NavLink to ='/setting' activeClassName={styles.selectedItem}>Setting</NavLink></div>
          
          
        
            
        </div>
    )
}
export default Navbar