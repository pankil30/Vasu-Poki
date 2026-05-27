export default async function Page() {
    const res = await fetch(
        'https://yupgames.io/g/monster-tracks-unblocked',
        {
            cache: 'no-store',
            headers: {
                rsc: '1',
            },
        }
    )

    const html = await res.text()

    // Find initialGameData object from HTML
    const match = html.match(/"initialGameData":\s*({.*?}),"requestId"/s)

    let initialGameData = null

    if (match?.[1]) {
        try {
            initialGameData = JSON.parse(match[1])
        } catch (error) {
            console.error('JSON parse error:', error)
        }
    }

    return (
        <>
            <h1>{initialGameData?.name}</h1>

            <pre>
                {JSON.stringify(initialGameData, null, 2)}
            </pre>
        </>
    )
}