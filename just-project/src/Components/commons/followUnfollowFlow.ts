import { userApi } from "../../API/userApi";

export function followUnfollowFlow(follow: boolean, id: number) {
    if (follow) {
        return userApi.follow(id);
    }
    return userApi.unFollow(id);
}
