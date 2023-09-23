import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0'
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response =>
            response.data)
    }
}


export const followUserAPI = {
    onFollowUser(userId: number) {
        return instance.post(`/follow/${userId}`).then(response =>
            response.data)
    },
    onUnfollowUser(userId: number) {
        return instance.delete(`/follow/${userId}`).then(response =>
            response.data)
    }
}


export const authAPI = {
    authMe() {
        return instance.get(`/auth/me`).then(response =>
            response.data)
    }
}

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get(`/profile/${userId}`).then(response =>
            response.data)
    }
}
