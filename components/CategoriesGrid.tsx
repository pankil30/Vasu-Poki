"use client"

import React from 'react'

type Item = {
    id?: number | string
    title: string
    image?: string | null
}

export default function CategoriesGrid({
    title = 'Categories',
    featured,
    items,
}: {
    title?: string
    featured?: Item | null
    items: Item[]
}) {
    return (
        <section className="w-full px-8 pb-10 pt-8">
            {/* <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2> */}

            <div className="grid grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
                {/* <div className="col-span-6 md:col-span-2 md:row-span-2">
                    <div className="relative aspect-square h-full w-full overflow-hidden rounded-[28px] bg-[#ffe65c] shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
                        {featured?.image ? (
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className="absolute inset-0 block h-full w-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-center text-3xl font-black tracking-tight text-white">
                                {featured?.title ?? 'POKI KIDS'}
                            </div>
                        )}
                    </div>
                </div> */}

                {items.map((it, idx) => (
                    <div
                        key={it.id ?? idx}
                        className="col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-1"
                    >
                        <div className="group flex h-full min-h-27.5 items-center gap-4 rounded-[22px] bg-[#F9FAFB] text-left shadow-[0_12px_30px_rgba(0,0,0,0.09)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-50 sm:h-18 sm:w-18">
                                {it.image ? (
                                    <img src={it.image} alt={it.title} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full bg-gray-200" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1 whitespace-normal wrap-break-word text-sm font-semibold leading-tight text-gray-800 transition-colors duration-300 group-hover:text-[#0f3b67]">
                                {it.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
