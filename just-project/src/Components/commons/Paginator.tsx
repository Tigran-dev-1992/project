import React from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentPage } from '../../redux/user-reducer'
import styles from './Pageinator.module.css'









type PropsType = {
    term: string
    friend: boolean | null
    totalCount: number
    pageSize: number
    porcionSize: number
    porceNumber: number
    currentPage: number
}
export const Paginator: React.FC<PropsType> = ({ friend, term, totalCount, pageSize, porcionSize, porceNumber, currentPage }) => {
  
    const dispatch = useDispatch()

    let pages = []
    const pagesCount = Math.ceil(totalCount / pageSize)
    const porceCount = Math.ceil(pagesCount / porcionSize)
    let firstPage = (porceNumber - 1) * porcionSize + 1
    let lastPage = porceNumber * porcionSize
    for (let i = 1; i <= pagesCount; i++) {
        if (i >= firstPage && i <= lastPage) {
            pages.push(i)
        }
    }


    let setCurrentPorceNumber = (porceNumber: number) => {
        currentPage = (porceNumber - 1) * porcionSize + 1
        dispatch(getCurrentPage(pageSize, currentPage, porceNumber, term, friend))
    }

    return (
        <div className={styles.pageinators}>
            <div className={styles.pageinator}>
                {porceNumber > 1 && <span onClick={() => setCurrentPorceNumber(porceNumber - 1)} className={styles.changer}>Prev</span>}
                {pages.map(p => {
                    return (
                        <span key={p} onClick={() => dispatch(getCurrentPage(pageSize, p, porceNumber, term, friend))} className={currentPage === p ? styles.currentPage : '' + "" + styles.page}  >
                            {p}
                        </span>
                    )
                })}
                {porceCount > porceNumber && <span onClick={() => setCurrentPorceNumber(porceNumber + 1)} className={styles.changer}>Next</span>}
            </div>
        </div>
    )
}

