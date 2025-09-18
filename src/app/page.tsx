
import GetCurrentUser from "@/services/getUser"
import { redirect } from "next/navigation";
import style from "./style.module.css"
import Link from "next/link";

export default  async function Home() {
  const user = await GetCurrentUser();
  if(user){
    return redirect("/chat")
  }
  
  return (
   <div className={style.container}>
      <h1>welcome to hadi chat</h1>
      <section>you can register without any phone number or email
        the only thing that you need just 
        <b> username and password</b>
      </section>
      <Link href={"/login"}>Login</Link>
   </div>
  )
}
