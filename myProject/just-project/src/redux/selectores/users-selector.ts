import { createSelector } from 'reselect'
import { RootState } from '../reduxStore'


export const termSelector = (state:RootState) => {
    return state.usersPage.filter.term
}
export const filterFizibilitySelector = (state:RootState) => {
    return state.usersPage.filterVizibility
}
export const friendSelector = (state:RootState) => {
    return state.usersPage.filter.friend
}
export const pageSizeSelector = (state:RootState) => {
    return state.usersPage.pageSize
}

export const totalCountSelector = (state:RootState) => {
    return state.usersPage.totalCount
}

export const porcionSizeSelector = (state:RootState) => {
    return state.usersPage.porcionSize
}

export const porceNumberSelector = (state:RootState) => {
    return state.usersPage.porceNumber
}

export const currentPageSelector = (state:RootState) => {
    return state.usersPage.currentPage
}

 const usersHelper = (state:RootState) => {
    return state.usersPage.users 
}

export const usersSelector = createSelector(usersHelper,(users)=>{
    return users.filter( u=>{ return u})
})

// export const isFetchingSelector = (state:RootState) => {
//     return state.usersPage.isFetching
// }

export const followInProgresSelector = (state:RootState) => {
    return state.usersPage.followInProgres
}

export const showLoaderSelector = (state:RootState) => {
    return state.usersPage.showLoader
}
