import profileReducer, { actions, InitialStateType } from "../profile-reducer"
import { PhotosType } from "../user-reducer"
let state : InitialStateType
beforeEach(()=>{
    state = {
        profile: {
            aboutMe: "string",
            userId: 1,
            lookingForAJob: true,
            lookingForAJobDescription: "string",
            fullName: "string",
            contacts: {
                github: "string",
                vk: "string",
                facebook: "string",
                instagram: "string",
                twitter: "string",
                website: "string",
                youtube: "string",
                mainLink: "string"
            },
            photos: {
                small: "string",
                large: "string"
            }
    
        },
        status: "string",
        editMode: true,
        loadingInProgres:false,
        showEditButtons: false
    }
})
const profile1= {
    aboutMe: "string",
    userId: 2,
    lookingForAJob: true,
    lookingForAJobDescription: "string",
    fullName: "string",
    contacts: {
        github: "string",
        vk: "string",
        facebook: "string",
        instagram: "string",
        twitter: "string",
        website: "string",
        youtube: "string",
        mainLink: "string"
    },
    photos: {
        small: "string",
        large: "string"
    }
}
const newPhotos:PhotosType={
    small : 'small',
    large : 'large'
}
test('status is updating', () => {
    
   const newState =  profileReducer(state,actions.setStatus("SET_STATUS"))
    expect(newState.status).toBe("SET_STATUS")

})
test('Profile is Changed', () => {
    
    const newState =  profileReducer(state,actions.setProfile(profile1))
     expect(newState.profile?.userId).toBe(2)
 
 })
 test('EditMode is Changed', () => {
    
    const newState =  profileReducer(state,actions.setEditMode(false))
     expect(newState.editMode).toBeFalsy()
 
 })
 test('LoadingInProgres is Changed', () => {
    
    const newState =  profileReducer(state,actions.setLoadingInProgres(true))
     expect(newState.loadingInProgres).toBeTruthy()
 
 })
 test('ShowEditButtonMode is Changed', () => {
    
    const newState =  profileReducer(state,actions.setShowEditButtonsMode(true))
     expect(newState.showEditButtons).toBeTruthy()
 
 })
 test('ShowEditButtonMode is Changed', () => {
    
    const newState =  profileReducer(state,actions.setPhotos(newPhotos))
     expect(newState.profile?.photos.large).toBe('large')
 
 })
