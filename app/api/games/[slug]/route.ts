// app/api/games/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server'

type Params = {
  params: Promise<{
    slug: string
  }>
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { slug } = await params

    const response = await fetch(`https://yupgames.io/g/${slug}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        rsc: '1',
        // 'x-api-key': '984A2215811B444EFF76811404990B77',
      },
      cache: 'no-store',
    })

    const contentType = response.headers.get('content-type') ?? ''
    const data = contentType.includes('application/json')
      ? await response.json()
      : await response.text()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch game details',
        error,
      },
      { status: 500 }
    )
  }
}