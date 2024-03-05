export const GiveData = ()=>{
    if(window.localStorage)
    {
        const data:any = localStorage.getItem('user')
        const res = JSON.parse(data)
        return res;
    }
}