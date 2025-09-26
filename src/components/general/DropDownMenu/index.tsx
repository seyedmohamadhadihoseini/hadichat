import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuComponent({ children, header, content }:
    { children: React.ReactNode, header?: string, content: { title: string, onClick: () => void }[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>{header}</DropdownMenuLabel>

                <DropdownMenuGroup>
                    {content.map(item => {
                        return <DropdownMenuItem className="cursor-pointer"  key={item.title} onClick={()=>{item.onClick()}}>
                            {item.title}
                        </DropdownMenuItem>
                    })}

                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
