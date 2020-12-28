
type MaxLengthType = (maxLength: number) => (value: string) => string | undefined

export const maxLengthCreator:MaxLengthType = (maxLength)=> (value)=> {
    if(value&&value.length>maxLength){
        return ` max length ${maxLength} simbol`
    }
    return undefined
}
type RecuiredType = (value: string) => string | undefined

export const required:RecuiredType= (value) => (value? undefined : 'Required')
export type ValidatorsType = MaxLengthType|RecuiredType
// export const maxLengthCreator = (lengthNum) =>{ 
//     return(
//         (value) =>{
//         if(!value||value.length<lengthNum) return undefined;
//         return` Max lenght is ${lengthNum} simbol!!!`
//         }
//     )
   
// }