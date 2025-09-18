"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    
    DialogHeader,
    DialogTitle,
    
} from "@/components/ui/dialog";
import style from "./style.module.css"





export function DialogComponent({ open, setOpen, title, description, children}: {
    open: boolean, setOpen: (x: boolean) => void, title: string, description: string, children: React.ReactNode,
}) {
    
    return (
        <Dialog open={open} onOpenChange={setOpen} > 
            <div>
                <DialogContent className={`sm:max-w-[425px] ${style.container}`} onClick={e => e.stopPropagation()} onToggle={() => {
                    setOpen(false)
                }} onInteractOutside={(e) => {
                    e.preventDefault()
                }}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}.
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                    {/* <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">ok</Button>
                    </DialogFooter> */}
                </DialogContent>
            </div>
        </Dialog>
    )
}
