"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface TitleProps {
    initialData: Doc<"documents">;
}

export const Title = ({
    initialData
}: TitleProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const document = useMutation(api.documents.update);

    const [title, setTitle] = useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = useState(false);

    const enabledInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);

        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disabledInput = () => {
        setIsEditing(false);
    }

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(event.target.value);
        document({
            id: initialData._id,
            title: event.target.value || "Untitled"
        })
    }

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            disabledInput();
        }
    }

    return (
        <div className="flex items-center gap-x-1">
            {!!!initialData.icon && (
                <p>
                    {initialData.icon}
                </p>
            )}
            {isEditing ? (
                <Input
                    ref={inputRef} 
                    onClick={enabledInput}
                    onBlur={disabledInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className="h-7 px-2 focus-visible:ring-transparent"
                />
            ) : (
                <Button onClick={enabledInput} variant="ghost" size="sm" className="font-normal h-auto p-1">
                    <span className="truncate">
                        {initialData?.title}
                    </span>
                </Button>
            )}
        </div>
    )
}

Title.Skeleton = function TitleSkeleton() {
    return (
        <Skeleton className="h-9 w-20 rounded-md" />
    )
}
