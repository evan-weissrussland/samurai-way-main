//объект с методом для запроса юзеров с сервера. Используется пагинация через Query-параметры
import {instance} from "./api";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response =>
            response.data)
    },
    onFollowUser(userId: number) {
        return instance.post(`/follow/${userId}`).then(response =>
            response.data)
    },
    onUnfollowUser(userId: number) {
        return instance.delete(`/follow/${userId}`).then(response =>
            response.data)
    }
}