import axios from "axios";


export function getUsers(currentPage: number, pageSize: number) {
   return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {withCredentials: true}).then(response =>
      response.data)
}

export function onFollowUser(userId: number) {
   return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, null, {withCredentials: true}).then(response =>
       response.data)
}

export function onUnfollowUser(userId: number) {
   return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, null, {withCredentials: true}).then(response =>
       response.data)
}