"use client"
import { Label } from "@/components/ui/label"
import style from "./style.module.css"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DialogComponent } from "@/components/general/dialog"
import ListGroupNewComponent from "./list"
import { Button } from "@/components/ui/button"
import { AddUserChatAction } from "@/app/chat/server"
import { AddNewChat } from "@/lib/websocket/actions"
import { useWebSocket } from "@/lib/websocket/context"
import { useUserData } from "@/hooks/use-userData"
import { toast } from "react-toastify"



export default function NewGroupHeaderComponent() {
    const [title, setTitle] = useState("");
    const [profile, setProfile] = useState<File>();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [ids, setIds] = useState([{ id: "0", value: "" }]);
    const { socket } = useWebSocket()
    const { user } = useUserData()
    return (
        <DropdownMenuItem onSelect={e => {
            e.preventDefault()
            setDialogOpen(true)
        }}>
            {dialogOpen && <DialogComponent title="new group" description="create new group" open={dialogOpen} setOpen={setDialogOpen}>
                <form className={style.addgroup} onSubmit={async (e) => {
                    e.preventDefault()
                    const data = new FormData()
                    data.append("title", title);
                    if (profile) {
                        data.append("profile", profile);
                    }
                    ids.push({ id: String(Date.now()), value: user.username })
                    ids.forEach(id => {
                        if (id.value.length > 0) {
                            data.append("username", id.value);
                        }
                    })
                    const chat = await AddUserChatAction(data)
                    if (chat) {
                        AddNewChat(socket, user, chat, ids.filter(id => id.value.length > 0).map(id => id.value))
                        toast(`new group ${title} created successfully`)
                        setDialogOpen(false)
                    } else {
                        toast("the username not exist in this app")
                    }
                }}>
                    <div className={style["input-data"]}>
                        <Label >title</Label>
                        <Input name="title" value={title} required onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className={style["input-data"]}>
                        <Label >profile</Label>
                        <Input type="file" name="profile" onChange={e => {
                            if (e.target.files) {
                                setProfile(e.target.files[0])
                            }
                        }} />
                    </div>
                    <ListGroupNewComponent ids={ids} setIds={setIds} />
                    <div className={style.submit}>
                        <Button type="submit" disabled={ids.length === 1 || title.length == 0}>accept</Button>
                    </div>
                </form>
            </DialogComponent>}
            <span>new group</span>
        </DropdownMenuItem>
    );
}