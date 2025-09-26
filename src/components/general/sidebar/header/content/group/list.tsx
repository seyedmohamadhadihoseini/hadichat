"use client"
import style from "./style.module.css"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CheckIfUsernameIsExist } from "@/app/chat/server"
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
type IdsType = {
    id:string;
    value:string;
}[]
export default function ListGroupNewComponent({ids,setIds}:{ids:IdsType,setIds:(ids:IdsType)=>void}) {

    
    const [idsList, setIdsList] = useState<React.ReactNode>();
    const addId = () => {
        setIds([...ids, { id: String(Date.now()), value: "" }]);
    };
    const removeId = (id: string) => {
        setIds(ids.filter((item) => item.id !== id));
    };
    const updateId = (id: string, value: string) => {
        setIds(ids.map((item) => (item.id === id ? { ...item, value } : item)));
    };
    useEffect(() => {
        setIdsList(ids.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
                <Input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateId(item.id, e.target.value)}
                    placeholder="enter the username..."
                    className="flex-1"
                />
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeId(item.id)}
                    disabled={ids.length === 1}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        )))
    }, [ids])
    
    return (
        <div className={`space-y-4 p-4 max-w-lg ${style.idlist}`}>
            <h2 className="text-lg font-bold">user list</h2>
            {idsList}
            <Button type="button" onClick={async () => {
                const lastValue = ids.findLast(item => item)
                if (!lastValue) {
                    return
                }
                if (ids.filter(item => item.value == lastValue.value).length > 1) {
                    toast("this username already exist")
                    return
                }
                const isUserExist = await CheckIfUsernameIsExist(lastValue.value);
                if (isUserExist) {
                    addId()
                } else {
                    toast.warn(`the username ${ids.findLast(item => item)?.value} isn't exist`);
                    updateId(lastValue.id, "")
                }
            }} className="w-full">
                add user
            </Button>
            
        </div>
    );
}