import { ThunkAction } from "redux-thunk"
import { getAuthData} from "./auth-reducer"
import { InferActionsType, RootState } from "./reduxStore"


const SET_INITIALAIZ = "SET_INITIALAIZ"

type InitialStateType = {
    initialaiz : boolean
}
const initialState = {
    initialaiz: false
}


const AppReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SET_INITIALAIZ':
            return {
                ...state,
                initialaiz: action.initialaiz
            }
        default:
            return state
    }
}

const appActions= {
    setInitialaiz : (initialaiz : boolean)=> ({ type: SET_INITIALAIZ, initialaiz }as const)
}

type ActionsType = InferActionsType<typeof appActions>
export const isInitialaized = ()  :ThunkAction<void,RootState,unknown,ActionsType>=>async (dispatch) => {
 let  promise= await  dispatch(getAuthData())
 Promise.all([promise])
        .then(() => {
            dispatch(appActions.setInitialaiz(true))
        })
}

export default AppReducer