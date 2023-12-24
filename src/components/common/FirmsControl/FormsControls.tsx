import React from "react";
import {WrappedFieldProps} from "redux-form/lib/Field";
import s from './FormsControls.module.css'
import {Field} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";


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



export function createField<FormKeysType extends string>(placeholder: string ='', name: FormKeysType, validators: FieldValidatorType[] = [], component: React.ComponentType<WrappedFieldProps>, type?: { type: string }, text:string = '') {
    const styleField = type?.type === 'checkbox' ? s.checkbox : s.input
    const styleDivField = type?.type === 'checkbox' ? s.divFieldForCheckbox : s.divField
    return (
        <div className={styleDivField}>
            <Field
                autoComplete={'off'}
                className={styleField}
                id={name+'1'}
                pristine={true}
                name={name}
                placeholder={placeholder}
                component={component}
                validate={validators}
                {...type}
            />
            {type?.type === 'checkbox' && <label className={s.label} htmlFor={name+'1'}>{text}</label>}

        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>