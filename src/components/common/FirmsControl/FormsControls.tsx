import React from "react";
import {WrappedFieldProps} from "redux-form/lib/Field";
import s from './FormsControls.module.css'
import {Field} from "redux-form";


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input} = props
    return <FormControl {...props}><textarea {...input} {...props}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input} = props
    return <FormControl  {...props}><input {...input} {...props}/></FormControl>
}

const FormControl: React.FC<WrappedFieldProps> = (
    {
        input,
        children,
        meta:{touched, error},
    }) => {
    const hasError = touched && error
    return <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
        <div>{children}</div>
        {hasError && <span>{error}</span>}
    </div>
}

export const createField = (placeholder: string = '', name: string, validators: ((value: any) => (undefined | string))[] = [], component: React.ComponentType<WrappedFieldProps>, type?: { type: string }, text:string = '') => {
    return (
        <div>
            <Field
                name={name}
                placeholder={placeholder}
                component={component}
                validate={validators}
                {...type}
            />
            {text}
        </div>
    )
}

