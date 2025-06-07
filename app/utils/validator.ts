export const maskTel = (value: string):string => {
    return value
    .replace(/\D/g, '').slice(0,11)
    .replace(/^(\d\d)(\d)/g,"($1) $2")
    .replace(/(\d{5})(\d)/,"$1-$2") 
  }