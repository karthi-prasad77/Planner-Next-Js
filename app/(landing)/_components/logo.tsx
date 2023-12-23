import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
})

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image 
                src="/logo.svg"
                width="40"
                height="40"
                alt="Logo"
                className="dark:hidden"
            />
            <Image 
                src="/logo-dark.svg"
                width="40"
                height="40"
                alt="Logo"
                className="hidden dark:block"
            />
            <p className={cn("font-semibold", font.className)}>
                Planner
            </p>
        </div>
    )
}