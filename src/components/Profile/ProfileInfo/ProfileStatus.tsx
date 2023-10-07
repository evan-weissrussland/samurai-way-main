import React, {ChangeEvent} from "react";
import {AppRootStateType} from "../../../redux/redux-store";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
    myProfileId: number | null
    userProfileId: number
}

type StateType = {
    editMode: boolean,
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, any> {

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