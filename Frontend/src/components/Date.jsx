const  days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export const Dat=(timestamp)=>{
    let date=new Date(timestamp);
    let t=`${date.getDate()} ${months[date.getMonth()]}`
    return t
}
