import { profileApi } from "../../API/profileApi"
import { ProfileType } from "../../Components/commons/CommonsFileTypes/ProfileType"
import { getUserProfile } from "../profile-reducer"
jest.mock("../../API/profileApi")




const profileApiMock = profileApi as jest.Mocked<typeof profileApi>
const result: ProfileType = {
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

profileApiMock.getProfile.mockReturnValue(Promise.resolve(result))


test('thunk', async () => {
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    const getProfile = getUserProfile(1)

    await getProfile(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
})

