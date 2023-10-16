export const required = (value:any) => {
    if (value) return undefined;
    return 'Field is required'
}
export const maxLengthCreator = (maxLength:any) => (value:any) => {
    if (value && value.length > maxLength) return `max length is ${maxLength} symbols`;
    return undefined
}