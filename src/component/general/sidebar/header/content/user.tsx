"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import style from "./style.module.css"
import { useState } from "react";
import { useUserData } from "@/hooks/use-userData";
import { AddUserChatAction } from "@/app/chat/server";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { AddNewChat } from "@/lib/websocket/actions";
import { useWebSocket } from "@/lib/websocket/context";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DialogComponent } from "@/component/general/dialog";
export default function NewUserHeaderComponent() {

    const [username, setUsername] = useState("");
    const { user } = useUserData();
    const { socket } = useWebSocket()
    const [dialogOpen, setDialogOpen] = useState(false);
    
    

    return (
        <DropdownMenuItem onSelect={(e) => {
            e.preventDefault()
            setDialogOpen(true);
        }}>
            {dialogOpen && <DialogComponent title="new user" description="enter the username of your contract" open={dialogOpen} setOpen={setDialogOpen}>
                <form className={style.adduser}  onSubmit={async (e) => {
                    e.preventDefault()
                    const data = new FormData()
                    data.append("username", username);
                    data.append("username", user.username);

                    const chat = await AddUserChatAction(data);
                    if (chat) {
                        setDialogOpen(false);
                        AddNewChat(socket, user, chat, [username, user.username]);
                        toast.success("user successfully added");
                    } else {
                        toast.warn("user with this username dosn't exist ");
                    }
                }}>

                    <div className={style["input-data"]}>
                        
                        <Label>username</Label>
                        <Input type="text" placeholder="enter user-name"  name="username" value={username} onChange={e => setUsername(e.target.value)} />
                        
                    </div>
                    <div className={style.operation}>
                        <Button type="submit">ok</Button>

                    </div>
                </form>
            </DialogComponent>}

            <span>new user</span>
        </DropdownMenuItem>

    );
}