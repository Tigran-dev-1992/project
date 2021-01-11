import React from 'react'
import { Field, WrappedFieldProps } from 'redux-form'
import { ValidatorsType } from './validators'


export function createField<FormName extends string,OwnProps={}>(
    name: FormName,
    placholder: string | undefined,
    validators: Array<ValidatorsType>,
    component: React.FC<WrappedFieldProps&OwnProps>,
    props: {},
    text: string){

    return (
        <div>
            <Field name={name} placeholder={placholder} validate={validators} component={component} {...props} />{text}
        </div>

    )
}
