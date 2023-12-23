//объект с методами для работы с профайлом юзера: запрос профиля юзера, запрос статуса юзера, изменение статуса моего профиля
import {ProfileDataFormType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {instance} from "./api";

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get(`/profile/${userId}`).then(response =>
            response.data)
    },
    getStatus(userId: number) {
        return instance.get(`/profile/status/${userId}`).then(response =>
            response.data)
    },
    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status}).then(response =>
            response.data)
    },
    savePhoto(image: File) {
        const formData = new FormData()
        formData.append('image', image)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response =>
            response.data)
    },
    updateProfile(profile: ProfileDataFormType) {
        return instance.put(`/profile`, profile).then(response =>
            response.data)
    },

}