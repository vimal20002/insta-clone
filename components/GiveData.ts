
export const GiveData = () => {
    if (typeof window !== "undefined" && window?.localStorage && localStorage?.getItem('user')!==undefined ) {
        const data: any = localStorage?.getItem('user')
        const res = JSON.parse(data)
        return res;
    }
}