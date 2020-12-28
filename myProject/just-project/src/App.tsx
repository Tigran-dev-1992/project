import React, { useState, Suspense } from 'react';
import styles from './App.module.css'
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import Dialogs from './Components/Content/Dialogs/Dialogs';
import LoginContainer from './Components/Content/Login/LoginContainer';
import ProfileContainer from './Components/Content/Profile/ProfileContainer';
import PreLoader from './Components/commons/PreLoader';
import Music from './Components/Music/Music';
import Todo from './Components/Content/todo/Todo';


const UsersContainer = React.lazy(() => import('./Components/Content/Users/UsersContainer'))

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
        <div>
          <Route path='/dialogs' render={() => <Dialogs />} />
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
          <Route path='/setting' render={() => <Todo />} />
        </div>
      </div>
    </div>
  );
}

export default App;
