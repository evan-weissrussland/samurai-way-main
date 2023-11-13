import {UsersType} from "../redux/users-reducer";

export const updateObjectInArray = (items: UsersType[], itemId: number, objPropName: keyof UsersType, newObjProps: {}):UsersType[] => {
    return items.map(u => u[objPropName] === itemId ? {...u, ...newObjProps} : u)
}