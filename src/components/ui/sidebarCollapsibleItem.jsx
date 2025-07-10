import { useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarMenuSub, SidebarMenuButton, SidebarMenuSubButton, SidebarMenuSubItem } from "./sidebar"
import { SheetTrigger } from "./sheet"
import Link from "next/link"

export function SidebarCollapsibleItem({ item, pathname }) {
    const [open, setOpen] = useState(true)

    return (
        <Collapsible defaultOpen={open} onOpenChange={setOpen} className="group/collapsible ">
            <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className={' text-gray-700 text-base font-semibold'}>
                    {item.icon}
                    <span>{item.title}</span>

                    {/* is open then rotate 90 deg */}
                    <ChevronRight className={cn("ml-auto transition-transform outline-gray-70", open ? "rotate-90" : 'rotate-0')} />
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub>
                    {item.subItems.map((subItem, subIndex) => (
                        <SidebarMenuSubItem key={subIndex}>
                            <SidebarMenuSubButton
                                size="sm"
                                className={"text-zinc-600 font-semibold"}
                                isActive={pathname.endsWith(subItem.href)}
                                asChild
                            >
                                <SheetTrigger asChild>

                                    <Link href={subItem.href}>
                                        {subItem.title}
                                    </Link>
                                </SheetTrigger>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    )
}
