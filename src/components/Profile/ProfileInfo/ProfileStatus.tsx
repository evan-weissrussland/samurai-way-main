import React, {ChangeEvent} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
    myProfileId: number | null
    userProfileId: number
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, any> {

    state = {
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