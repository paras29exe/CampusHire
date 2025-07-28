"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function DialogBox({
    title,
    description,
    onCancel,
    onSuccess,
    open,
    setOpen,
    cancelText = "Cancel",
    confirmText = "Confirm",
    loading = false
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2 mt-4">
                    <Button disabled={loading} variant="outline" onClick={() => {
                        if (onCancel) onCancel()
                        setOpen(false)
                    }}>{cancelText}</Button>
                    <Button disabled={loading} onClick={() => {
                        if (onSuccess) {
                            onSuccess()
                        }
                    }}>
                        {!loading ? confirmText : "Processing..."}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
