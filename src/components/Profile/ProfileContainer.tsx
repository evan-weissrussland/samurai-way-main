import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {AppRootStateType} from "../../redux/redux-store";
import {
    getProfileUserTC,
    getStatusUserTC,
    ProfileType,
    savePhotoTC,
    updateProfileUserTC,
    updateStatusUserTC
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileDataFormType} from "./ProfileInfo/ProfileDataForm";

//классовый компонент
export class ProfileContainer extends React.Component<PropsType, any> {

//метод аналог useEffect'a. Отрабатывает после первоначального рендера компонента
    componentDidMount() {
        const {match, authorizedUserId, history} = this.props
        let userId = Number(match.params.userId)
//внизу логика: после монтирования компонента идёт запрос на сервер на получение профиля юзера, а также запрос на получение статуса этого юзера. Также сохраняется в локал сторэйдж id юзера для того, чтобы после перезагрузки браузера подтянулся ранее открытый профиль
        const localStorageUserId = localStorage.getItem('userId')
        if (userId) {
//если в URL есть id юзера, то сохраняем его в локал сторэйдж и делаем запрос на получение его профиля и статуса
            localStorage.setItem('userId', JSON.stringify(userId))
            this.props.getProfileUserTC(userId)
            this.props.getStatusUserTC(userId)
        } else if (localStorageUserId) {
//если в URL id юзера не было, но есть сохранённый в локал сторэйдж id юзера, то запрашиваем его профиль и статус
            this.props.getProfileUserTC(JSON.parse(localStorageUserId))
            this.props.getStatusUserTC(JSON.parse(localStorageUserId))
        } else if (authorizedUserId){
//если нет в URL id юзера и нет сохранённого id в локал сторэйдж, то в санку отправляем id своего профиля
            this.props.getProfileUserTC(authorizedUserId)
            this.props.getStatusUserTC(authorizedUserId)
        } else {
           history.push('/login')
        }
    }

//метод отрабатывает при перерендере коипонента
    componentDidUpdate() {
        const {myProfileId, match} = this.props
if (myProfileId && match.params.userId === myProfileId.toString()) {
    localStorage.setItem('userId', JSON.stringify(match.params.userId))
        }
    }

//метод возвращающий jsx-разметку
    render() {
        const {profile} = this.props
        return (
            // <Profile {...this.props} isOwner={!this.props.match.params.userId} profile={profile}/>
            <Profile {...this.props} isOwner={+this.props.match.params.userId === this.props.myProfileId || this.props.profile?.userId === this.props.myProfileId } profile={profile}/>
        );
    }
}

//----блок типизации----

//типизация компонента. Склейка типа из withRouter(вытягивается тип из URL) и пропсов connect'а
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

// типизация значения, вытягиваемого withRouter из URL
type PathParamsType = {
    userId: string
}

// типизация пропса isOwner
type IsOwnerType = {
    isOwner: boolean
}

//склейка типов пропсов connect'а (пропсы и санки)
export type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType & IsOwnerType

//типизация стэйта connect'а
type MapStateToPropsType = {
    profile:ProfileType | null
    status:string
    myProfileId:number | null
    authorizedUserId: number | null
    isAuth: boolean
}

//типизация санок connect'а
type MapDispatchToPropsType = {
    getProfileUserTC: (paramsUserId:number) => void
    getStatusUserTC: (userId:number) => void
    updateStatusUserTC: (status:string) => void
    savePhotoTC: (image:File) => void
    updateProfileUserTC: (profile: ProfileDataFormType) => Promise<void>

}

//------ конец блока типизации-----------

// переменные, вытягиваемые connect'ом из редакса
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        myProfileId: state.auth.id,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

// оборачиваем компонент в withRouter для вытягивания значения из URL
     // const WithUrlDataContainerComponent = withRouter(ProfileContainer)
// здесь ХОК: передаём компонент, он возвращает изменённый компонент. Нужен ХОК для исключения дублирования кода
     // export const ProfileAPIContainer = withAuthRedirect(connect(mapStateToProps, {getProfileUserTC})(WithUrlDataContainerComponent))

// функция compose: позволяет записать все компоненты-обёртки в одну строку. ProfileContainer оборачивается в withRouter, поверх этого в connect и далее передаётся в ХОК вместе с пропсами из connect'а и withRouter'а.
const ProfileAPIContainer = compose<React.ComponentType>(connect(mapStateToProps,{getProfileUserTC,getStatusUserTC,updateStatusUserTC, savePhotoTC, updateProfileUserTC}),withRouter,withAuthRedirect)(ProfileContainer)
export default ProfileAPIContainer

//connect нужен для вытягивания из редакса стэйта и диспатча
//withRouter нужен для вытягивания данных из URL и передачи их в нужный компонент в виде пропсов
//withAuthRedirect - ХОК. Для исключения дублирования кода, т.к. во многих копонентах приложения будет одинаковая логика, написанная в ХОКе.