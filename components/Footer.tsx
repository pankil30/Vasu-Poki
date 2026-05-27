import { ChevronDown, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

const popularLinks = ['Cars', 'Adventure', 'Arcade', 'Puzzle', 'Sports', 'All Games']
const supportLinks = ['FAQ', 'Contact', 'Privacy Center']
const aboutLinks = ['About', 'Poki for Developers', 'Poki Kids', 'Jobs']

function SocialIcon({ label }: { label: 'tiktok' | 'instagram' | 'youtube' }) {
    const baseClass = 'flex h-12 w-12 items-center justify-center rounded-full bg-[#0f3b67] text-white transition-transform hover:scale-105'

    if (label === 'instagram') {
        return (
            <a href="#" aria-label="Instagram" className={baseClass}>
                <Instagram className="h-5 w-5" />
            </a>
        )
    }

    if (label === 'youtube') {
        return (
            <a href="#" aria-label="YouTube" className={baseClass}>
                <Youtube className="h-5 w-5" />
            </a>
        )
    }

    return (
        <a href="#" aria-label="TikTok" className={baseClass}>
            <span className="text-lg font-black leading-none">♪</span>
        </a>
    )
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
    const mapping: Record<string, string> = {
        cars: '/car',
        car: '/car',
        adventure: '/adventure',
        arcade: '/arcade',
        puzzle: '/puzzle',
        sports: '/sports',
        'all games': '/games',
    }

    return (
        <div className="space-y-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-300">{title}</h3>
            <ul className="space-y-3">
                {links.map((link) => {
                    const key = link.toLowerCase().trim()
                    const href = mapping[key] ?? '#'

                    return (
                        <li key={link}>
                            <Link href={href} className="text-[14px] font-bold text-slate-700 transition-colors hover:text-[#0f3b67]">
                                {link}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-white">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-white shadow-[0_8px_28px_rgba(15,59,103,0.06)] [clip-path:polygon(0_20%,30%_0,100%_8%,100%_100%,0_100%)]" />
            <div className="pointer-events-none absolute left-[31%] top-0 h-full w-16 bg-white/95 [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)] shadow-[0_0_16px_rgba(15,59,103,0.03)]" />

            <div className="relative mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:gap-8">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl font-black tracking-tight text-[#0f3b67]">Loki</div>
                                <div className="text-lg font-bold text-[#0f3b67]">Let the world play</div>
                            </div>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-extrabold text-sky-500 shadow-sm"
                            >
                                <span className="text-base">🇺🇸</span>
                                <span>English</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <SocialIcon label="tiktok" />
                            <SocialIcon label="instagram" />
                            <SocialIcon label="youtube" />
                        </div>
                    </div>

                    <FooterColumn title="Popular" links={popularLinks} />
                    <FooterColumn title="Help and Support" links={supportLinks} />
                    <FooterColumn title="Get to know us" links={aboutLinks} />
                </div>
            </div>
        </footer>
    )
}
