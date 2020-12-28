import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import styles from './Input.module.css'


// export let Input = ({meta,input, ...restProps}) => {
//     let hasError = meta.error&&meta.touched

//     debugger
//     return (
//         <div className={hasError&&styles.inputError}>
//             <div >
//                 <input {...input} {...restProps}  className= {hasError?styles.error:"" +""+ styles.inputStyle}/>
//             </div>
// {hasError&&meta.error}
//         </div>
//     )
// }

export type OwnPropsType = {
    
};
const UniInput:React.FunctionComponent<WrappedFieldProps&OwnPropsType> = ({ meta, input, ...restProps }) => {
    let hasError = meta.error && meta.touched
    return (
        <div className={hasError?styles.inputError:""}>
            <div >
                {restProps.children}
            </div>
            {hasError && meta.error}
        </div>
    )

}



export let Input:React.FunctionComponent<WrappedFieldProps&OwnPropsType> = (props) => {
    const { meta, input, ...restProps } = props
    let hasError = meta.error && meta.touched
    return (
        <div>
            <UniInput {...props}><input {...input} {...restProps} className= {hasError?styles.error:"" +""+ styles.inputStyle} /></UniInput>
        </div>
    )
}
export let Textarea:React.FunctionComponent<WrappedFieldProps&OwnPropsType> = (props) => {
    const { meta, input, ...restProps } = props
    let hasError = meta.error && meta.touched
    return (
        <div>
            <UniInput {...props}><textarea {...input} {...restProps} className= {hasError?styles.error:"" +""+ styles.inputStyle}/></UniInput>
        </div>
    )
}


