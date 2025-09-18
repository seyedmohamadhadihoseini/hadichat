import prisma from "@/services/prisma";


export default function SendButton({id,text,setText}:{id:number,text:string,setText:any})
{
    
    return (
        <button onClick={e =>{
            e.preventDefault();
            setText("");
         }}>ok</button>
    );
}