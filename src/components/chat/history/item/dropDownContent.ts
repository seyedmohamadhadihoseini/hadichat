import { Message } from "@prisma/client"

export default function DropDownContents(message: Message):{
    title: string;
    onClick: () => void;
}[] {

    return [
        {
            title: "copy", onClick: () => {
                navigator.clipboard.writeText(message.text)
            }
        }, {
            title: "replay",
            onClick() {

            }
        }, {
            title: "edit",
            onClick(){}
        }
    ]
}