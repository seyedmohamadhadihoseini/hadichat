import SendMessageComponent from "@/component/chat/send";
import storeMessage from "./server";

export default function SendMessageApp(){
    return <SendMessageComponent  storeMessage={storeMessage}/>
}