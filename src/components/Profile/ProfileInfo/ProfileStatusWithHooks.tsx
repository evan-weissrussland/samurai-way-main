import React, {ChangeEvent, useEffect, useState} from "react";

//--------блок типизации----------
//типизация пропсов
type ProfileStatusProps = {
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


export const ProfileStatusWithHooks = ({status,userProfileId, myProfileId, updateStatus}: ProfileStatusProps) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [localStatus, setLocalStatus] = useState<string>('props.status')

    useEffect( () => {
        setLocalStatus(status)
    }, [status])

    const activateEditModeHandler = () => {
        myProfileId === userProfileId && setIsEditMode(true)
    }

    const onChangeValueLocalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    const setStatusHandler = () => {
        updateStatus(localStatus)
        setIsEditMode(false)
    }

    return (
        <div>
            {
                !isEditMode ?
            <div>
                <span onDoubleClick={activateEditModeHandler}>{localStatus || 'no status'}</span>
            </div>
                :
                <div>
                    <input onChange={onChangeValueLocalHandler} autoFocus value={localStatus}
                           onBlur={setStatusHandler}/>
                </div>
            }
        </div>)

}