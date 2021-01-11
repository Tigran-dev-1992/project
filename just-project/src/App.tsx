import React, { useState, Suspense } from 'react';
import styles from './App.module.css'
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import { Redirect, Route } from 'react-router-dom';
import LoginContainer from './Components/Content/Login/LoginContainer';
import ProfileContainer from './Components/Content/Profile/ProfileContainer';
import PreLoader from './Components/commons/PreLoader';
import Music from './Components/Music/Music';




const UsersContainer = React.lazy(() => import('./Components/Content/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./Components/Content/Dialogs/Dialogs'))

function App() {
  let [activNavbar, setNavbarStatus] = useState(false)
  return (
    <div className={styles.app}>
      <div className={styles.burger} onClick={() => setNavbarStatus(!activNavbar)}>
        {activNavbar
          ? <span >X</span>
          : <b ></b>
        }
      </div>
      <div>
          <Route exact path='/' render={() => <Redirect to={"/profile"} />} />
        </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={activNavbar ? styles.navbarActivate : styles.navbar} >
        <Navbar />
      </div>
      <div className={styles.content}>
        <div>
          <Route  path='/profile/:id?' render={() => <ProfileContainer />} />
        </div>
        <div><Suspense fallback={<PreLoader/>}>
        <Route path='/dialogs' render={() => <DialogsContainer />} />
        </Suspense>
        </div>
        <div>
          <Suspense fallback = {<PreLoader/>}>
            <Route path='/users' render={() => <UsersContainer />} />
          </Suspense>
        </div>
        <div className={styles.login}>
          <Route path='/login' render={() => <LoginContainer />} />
        </div>
        <div>
          <Route path='/music' render={() => <Music />} />
        </div>
        <div>
          <Route path='/setting' render={() => <h1>Here will be Settings</h1>} />
        </div>
      </div>
    </div>
  );
}

export default App;
