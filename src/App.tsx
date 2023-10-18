import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileAPIContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/LoginPage/LoginPage";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/app-reducer";
import {AppRootStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";


export class AppContainer extends React.Component<any, any> {
    //метод аналог useEffect'a. Отрабатывает после первоначального рендера компонента
    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {
        if (!this.props.isInizialized) {
            return <Preloader/>
        }

//внешняя функция для передачи пропсов в компоненту DialogsContainer. Нужна для того, чтобы пробросить пропсы в компонент. Если пропсов много, то при проброске их в строке с Rout'ом синтаксис разрастётся, поэтому используются внешнюю переменную. Но с исползованием connect'а или useSelector'а необходимости пробрасывать пропсы нет.
        const DialogsComponent = () => <DialogsContainer/>
//внешняя функция для передачи пропсов в компоненту ProfileAPIContainer. Нужна для того, чтобы пробросить пропсы в компонент. Если пропсов много, то при проброске их в строке с Rout'ом синтаксис разрастётся, поэтому используются внешнюю переменную. Но с исползованием connect'а или useSelector'а необходимости пробрасывать пропсы нет.
        const ProfileComponent = () => <ProfileAPIContainer/>
        return (
            <div className={'app-wripper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wripper-content'}>
                    <Route path={'/dialogs'} render={DialogsComponent}/>
                    <Route path={'/profile/:userId?'} render={ProfileComponent}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/login'} render={() => <LoginContainer/>}/>
                </div>
            </div>
        );
    }
}
type MapStateToPropsType = {
    isInizialized: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        isInizialized: state.app.isInizialized
    }
}

export const App = compose<React.ComponentType>(withRouter,connect(mapStateToProps, {initializeAppTC}))(AppContainer)