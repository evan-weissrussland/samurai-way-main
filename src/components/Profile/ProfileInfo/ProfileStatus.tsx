import React, {ChangeEvent} from "react";

//--------блок типизации----------
//типизация пропсов
type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
    myProfileId: number | null
    userProfileId: number
}

//типизация локального стэйта классового компонента
type StateType = {
    editMode: boolean,
    status: string
}
//---конец блока типизации---------

//классовый компонент. Наследуется от React.Component
export class ProfileStatus extends React.Component<ProfileStatusPropsType, any> {
//классовый локальный стэйт. Аналог useState
    state: StateType = {
        editMode: false,
        status: this.props.status ?? 'no status'
    }

    activateEditMode = () => {
        if (this.props.myProfileId === this.props.userProfileId) {
            this.setState({
                editMode: true
            })
        }
    }

    closeEditMode = () => {
//this.setState() - нужен для изменения локального стэйта классовой компоненты. Аналог функции, меняющей useState
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onChangeValueLocal = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onChangeValueLocal} autoFocus value={this.state.status}
                               onBlur={this.closeEditMode}/>
                    </div>}
            </div>)
    }
}