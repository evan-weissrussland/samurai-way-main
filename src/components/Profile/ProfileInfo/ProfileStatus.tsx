import React, {FC, useState} from "react";

type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, any> {
    state = {
        editMode: false,
        value:this.props.status
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }
    closeEditMode() {
        this.setState({
            editMode: false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus value={this.state.value} onBlur={this.closeEditMode.bind(this)}/>
                    </div>}
            </div>)
    }
}