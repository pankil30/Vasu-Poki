"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'
import CategoriesGrid from '../../components/CategoriesGrid'

const BOX_COUNT = 107
const IMAGE_PREFIX = 'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=408,height=408,fit=cover,f=auto/'
const CATEGORY_SLUG = 'adventure'

type Game = {
    id: number
    slug?: string
    title?: string
    image_url?: string
    image?: {
        path?: string
    }
    video?: string
}

type Category = {
    id?: number
    title?: string
    image_url?: string
    image?: {
        path?: string
    }
}

function seededShuffle<T>(values: T[], seedStart: number) {
    const shuffled = [...values]
    let seed = seedStart

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        seed = (seed * 1664525 + 1013904223) % 4294967296
        const randomIndex = seed % (index + 1)
        const value = shuffled[index]
        shuffled[index] = shuffled[randomIndex]
        shuffled[randomIndex] = value
    }

    return shuffled
}

function buildTileSizes(count: number) {
    const largeCount = Math.max(2, Math.round(count * 0.04))
    const mediumCount = Math.max(8, Math.round(count * 0.16))
    const smallCount = Math.max(0, count - largeCount - mediumCount)

    const sizes = [
        ...Array(largeCount).fill(3),
        ...Array(mediumCount).fill(2),
        ...Array(smallCount).fill(1),
    ]

    const LAST_SMALL_COUNT = 11
    const shuffled = seededShuffle(sizes, count * 97)

    shuffled[0] = 1

    for (let i = 0; i < LAST_SMALL_COUNT; i++) {
        const idx = shuffled.length - 1 - i
        if (idx >= 0) shuffled[idx] = 1
    }

    return shuffled
}

export default function AdventurePage() {
    const [viewport, setViewport] = useState({ width: 0, height: 0 })
    const [games, setGames] = useState<Game[]>([])
    const [categoryTitle, setCategoryTitle] = useState<string>('Categories')
    const [categoryFeatured, setCategoryFeatured] = useState<{ id?: number | string; title: string; image: string | null } | null>(null)
    const [categoryItems, setCategoryItems] = useState<{ id?: number | string; title: string; image: string | null }[]>([])
    const [hoveredGameId, setHoveredGameId] = useState<number | null>(null)

    useEffect(() => {
        const updateViewport = () => {
            setViewport({ width: window.innerWidth, height: window.innerHeight })
        }

        updateViewport()
        window.addEventListener('resize', updateViewport)

        return () => window.removeEventListener('resize', updateViewport)
    }, [])

    useEffect(() => {
        const loadGames = async () => {
            try {
                const url = `${window.location.origin}/api/games?slug=${CATEGORY_SLUG}`
                const response = await fetch(url, { cache: 'no-store' })
                const data = await response.json()

                const list = Array.isArray(data?.games)
                    ? data.games
                    : Array.isArray(data?.data?.games)
                        ? data.data.games
                        : Array.isArray(data)
                            ? data
                            : []

                setGames(list.slice(0, BOX_COUNT))
            } catch (error) {
                console.error('[adventure] fetch error', error)
                setGames([])
            }
        }

        loadGames()
    }, [])

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch(`${window.location.origin}/api/category`, { cache: 'no-store' })
                const data = await response.json()

                const featured = Array.isArray(data?.breadcrumb) ? data.breadcrumb[0] : null
                const related = Array.isArray(data?.related_categories) ? data.related_categories : []

                setCategoryTitle(data?.title ?? 'Categories')
                setCategoryFeatured(
                    featured
                        ? {
                            id: featured.id,
                            title: featured.title ?? 'Categories',
                            image: featured.image_url ? `${IMAGE_PREFIX}${featured.image_url}` : featured.image?.path ? `${IMAGE_PREFIX}${featured.image.path}` : null,
                        }
                        : null
                )
                setCategoryItems(
                    related.map((item: Category) => ({
                        id: item.id,
                        title: item.title ?? 'Category',
                        image: item.image_url ? `${IMAGE_PREFIX}${item.image_url}` : item.image?.path ? `${IMAGE_PREFIX}${item.image.path}` : null,
                    }))
                )
            } catch (error) {
                console.error('[adventure category] fetch error', error)
            }
        }

        loadCategories()
    }, [])

    const visibleGames = useMemo(() => games.slice(0, BOX_COUNT), [games])
    const tileOrder = useMemo(() => buildTileSizes(visibleGames.length), [visibleGames.length])

    const gridLayout = useMemo(() => {
        if (!viewport.width) {
            return { columns: 2, maxSpan: 1, gap: 12, horizontalPadding: 16 }
        }

        if (viewport.width < 640) {
            return { columns: 2, maxSpan: 1, gap: 12, horizontalPadding: 16 }
        }

        if (viewport.width < 768) {
            return { columns: 3, maxSpan: 2, gap: 12, horizontalPadding: 16 }
        }

        if (viewport.width < 1024) {
            return { columns: 4, maxSpan: 2, gap: 14, horizontalPadding: 24 }
        }

        if (viewport.width < 1280) {
            return { columns: 6, maxSpan: 3, gap: 16, horizontalPadding: 32 }
        }

        return { columns: 8, maxSpan: 3, gap: 18, horizontalPadding: 32 }
    }, [viewport.width])

    const cellSize = useMemo(() => {
        if (!viewport.width) return 120

        const availableWidth = Math.max(320, viewport.width - gridLayout.horizontalPadding * 2)
        const rawSize = Math.floor((availableWidth - gridLayout.gap * (gridLayout.columns - 1)) / gridLayout.columns)

        return Math.max(56, Math.min(180, rawSize))
    }, [gridLayout.columns, gridLayout.gap, gridLayout.horizontalPadding, viewport.width])

    return (
        <main
            className="fixed inset-0"
            style={{
                backgroundColor: '#c4d4a460',
                backgroundImage: "url('/Mendi-crystal.png')",
                backgroundRepeat: 'repeat',
                backgroundSize: '400px',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
            }}
        >
            <div className="relative h-full overflow-auto">
                <div
                    className="mx-auto pt-8"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridLayout.columns}, ${cellSize}px)`,
                        gridAutoRows: `${cellSize}px`,
                        gridAutoFlow: 'dense',
                        gap: `${gridLayout.gap}px`,
                        alignItems: 'start',
                        justifyContent: 'center',
                        width: 'fit-content',
                        minWidth: '100%',
                        paddingInline: `${gridLayout.horizontalPadding}px`,
                    }}
                >
                    {tileOrder.map((size, i) => {
                        const game = visibleGames[i]
                        const imagePath = game?.image_url ?? game?.image?.path
                        const imageUrl = imagePath ? `${IMAGE_PREFIX}${imagePath}` : null
                        const isHovered = hoveredGameId === game?.id
                        const span = Math.min(size, gridLayout.maxSpan)

                        return (
                            <div
                                key={game?.id ?? i}
                                style={{
                                    gridColumn: `span ${span}`,
                                    gridRow: `span ${span}`,
                                }}
                            >
                                {game ? (
                                    <Link
                                        href={`/games/${game.slug}`}
                                        className="group relative block h-full w-full min-h-0 min-w-0 overflow-hidden rounded-lg shadow bg-black/10"
                                        onMouseEnter={() => game && setHoveredGameId(game.id)}
                                        onMouseLeave={() => setHoveredGameId(null)}
                                        aria-label={game.title ?? 'Open game'}
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={game?.title ?? 'Game'}
                                                loading="lazy"
                                                referrerPolicy="no-referrer"
                                                className="block h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-white/80 text-sm font-medium">
                                                Loading...
                                            </div>
                                        )}

                                        {game && isHovered && game.video ? (
                                            <video
                                                key={game.video}
                                                src={game.video}
                                                poster={imageUrl ?? undefined}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className="absolute inset-0 h-full w-full object-cover"
                                                style={{ background: 'transparent' }}
                                            />
                                        ) : null}

                                        <div
                                            className="absolute inset-x-0 bottom-0 px-3 py-2 text-center text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                                            style={{
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)'
                                            }}
                                        >
                                            <p className="truncate text-sm font-semibold">{game.title}</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-white/80 text-sm font-medium">
                                        Loading...
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-0">
                    <CategoriesGrid
                        title={categoryTitle}
                        featured={categoryFeatured}
                        items={categoryItems}
                    />
                </div>

                <Footer />
            </div>
        </main>
    )
}
