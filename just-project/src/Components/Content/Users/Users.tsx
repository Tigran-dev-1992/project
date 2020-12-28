import Aos from 'aos'
import 'aos/dist/aos.css'
import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import photos from '../../../images/userPhoto.jpg'
import {
    currentPageSelector, filterFizibilitySelector, followInProgresSelector,
    friendSelector, pageSizeSelector, porceNumberSelector, porcionSizeSelector,
    showLoaderSelector,
    termSelector, totalCountSelector, usersSelector
} from '../../../redux/selectores/users-selector'
import { followUnfollowUser, getUsers } from '../../../redux/user-reducer'
import { Paginator } from '../../commons/Paginator'
import PreLoader from '../../commons/PreLoader'
import styles from './Users.module.css'
import UsersFilterForm from './UsersFilter'
import queryString from 'query-string'


export type ValueType = {
    term: string
    friend: string
}

const Users: React.FC = () => {
    const users = useSelector(usersSelector)
    const totalCount = useSelector(totalCountSelector)
    const pageSize = useSelector(pageSizeSelector)
    const porcionSize = useSelector(porcionSizeSelector)
    const porceNumber = useSelector(porceNumberSelector)
    let currentPage = useSelector(currentPageSelector)
    const followInProgres = useSelector(followInProgresSelector)
    const showLoader = useSelector(showLoaderSelector)
    const term = useSelector(termSelector)
    const friend = useSelector(friendSelector)
    const filterVizibility = useSelector(filterFizibilitySelector)

    useEffect(() => { Aos.init({ duration: 1500 }) }, [])

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search)
        let actualPage = currentPage
        let actualTerm = term
        let actualFriend = friend
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualTerm = parsed.term as string
        switch (parsed.friend) {
            case "true": actualFriend = true
                break
            case "false": actualFriend = false
                break
            case "null": actualFriend = null
                break

        }
        dispatch(getUsers(pageSize, actualPage, actualTerm, actualFriend))
    }, [])



    useEffect(() => {
        history.push({
            pathname: `/users`,
            search: `?count=100&page=${currentPage}&term=${term}&friend=${friend}`
        })
    }, [term, friend, currentPage])


    const initialForm = {
        term: term,
        friend: friend === true ? "true" : friend === false ? "false" : "all"
    }
    const onChange = debounce((value: ValueType) => {
        let friendValue = value.friend === "true" ? true : value.friend === "false" ? false : null
        if(value!=initialForm) dispatch(getUsers(pageSize, currentPage = 1, value.term, friendValue))
        
    }, 800)

    return (
        <div>
            <div>
                <UsersFilterForm onChange={onChange} filterVizibility={filterVizibility} enableReinitialize initialValues={initialForm}/>
            </div>
            {showLoader
                ? <div >
                    <PreLoader />
                </div>

                : <div>
                    <div className={styles.pagesss}>
                        {Paginator({ term, friend, totalCount, pageSize, porcionSize, porceNumber, currentPage })}
                    </div>
                    <div className={styles.container} >
                        {users.map(u => {
                            return (
                                <div className={styles.userItem} key={u.id} data-aos='fade-down'>
                                    <div className={styles.itemName}>
                                        {u.name}
                                    </div>
                                    <div>
                                        <NavLink to={`/profile/${u.id}`}><img src={u.photos.small || photos} className={styles.photos} /></NavLink>
                                    </div>
                                    <div className={styles.followedUser}>
                                        <button onClick={() => dispatch(followUnfollowUser(!u.followed, u.id))} disabled={followInProgres.some(id => id === u.id)}>
                                            {u.followed ? 'Unfollow' : 'Follow'}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            }

        </div>
    )
}
export default React.memo(Users)