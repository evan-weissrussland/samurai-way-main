//объект с методом для запроса юзеров с сервера. Используется пагинация через Query-параметры
import {GetItemsType, instance, APIResponseType} from "./api";


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`/users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    onFollowUser(userId: number) {
        return instance.post<APIResponseType>(`/follow/${userId}`).then(response => response.data)
    },
    onUnfollowUser(userId: number) {
        return instance.delete(`/follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
    }
}