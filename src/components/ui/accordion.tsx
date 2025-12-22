"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
    title: string
    children: React.ReactNode
    isOpen?: boolean
    onToggle?: () => void
    index?: number
}

export function AccordionItem({ title, children, isOpen, onToggle, index = 0 }: AccordionItemProps) {
    return (
        <div className="border-b border-gray-100 last:border-b-0">
            <button
                onClick={onToggle}
                className={cn(
                    "flex w-full items-center justify-between py-5 text-left transition-all duration-300 group",
                    isOpen ? "text-teal-600" : "text-navy-900 hover:text-teal-600"
                )}
            >
                <span className="font-semibold text-lg pr-4">{title}</span>
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                    isOpen
                        ? "bg-teal-500 text-white rotate-180"
                        : "bg-gray-100 text-gray-600 group-hover:bg-teal-500/10 group-hover:text-teal-600"
                )}>
                    <ChevronDown className="h-4 w-4" />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-5 text-gray-600 leading-relaxed">
                            {typeof children === 'string' ? (
                                <p className="whitespace-pre-line">{children}</p>
                            ) : (
                                children
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

interface AccordionProps {
    items: { title: string; content: React.ReactNode }[]
    defaultOpen?: number
}

export function Accordion({ items, defaultOpen }: AccordionProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpen ?? null)

    return (
        <div className="w-full divide-y divide-gray-100">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    index={index}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    )
}
