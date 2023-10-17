import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FirmsControl/FormsControls";
import {required} from "../../utils/validators/validators";
import s from '../common/FirmsControl/FormsControls.module.css'

//типизация данных, собираемых функцией handleSubmit. Каждое имя ключа взято из атрибута "name" каждого Field'а
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'email'}
                    placeholder={'email'}
                    component={Input}
                    validate={[required]}/>
            </div>
            <div>
                <Field
                    name={'password'}
                    placeholder={'Password'}
                    type={'password'}
                    component={Input}
                    validate={[required]}/>
            </div>
            <div>
                <Field
                    name={'rememberMe'}
                    type={"checkbox"}
                    component={Input}/>
                remember me
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>
                    login
                </button>
            </div>
        </form>
    )
}

//создаём компонент-обёртку LoginReduxForm для компонента LoginForm. Обёртка будет обрабатывать данные из формы в компоненте LoginForm.
export const LoginReduxForm = reduxForm<FormDataType>({
    //для свойства form задаём уникальное имя, чтобы библиотека redux-form отличала формы этой компоненты от форм других компонет
    form: 'login'
})(LoginForm)


// -------описание-------

//Field - это обёртка из библиотеки redux-form для тегов формы: она обязательно должна принимать атрибут name (уникальный), component (определяет тип тега формы). Также можно дополнительно писать все атрибуты, присущие тегам HTML-форм, например, для инпута - это placeholder.

//props.handleSubmit - это функция из библиотеки redux-form. Она приходит из обёртки LoginReduxForm и собирает данные из всех форм Field компонента при нажатии на кнопку button. На основании этих данных она создаёт объект, где ключи будут иметь такое же название, как и атрибуты "name" в Field'ах. У нас 3 Field'а, соответственно, будет 3 свойства: {login:'', password:'', rememberMe:true or false}. Именно этот объект мы и типизируем, как FormDataType

//В родителе мы прокидываем сюда пропс onSubmit, но он не попадает в компонент LoginForm напрямую, он попадает в обёртку LoginReduxForm и вызывается из неё, передавая объект {login:'', password:'', rememberMe:true or false}, полученный из props.handleSubmit.