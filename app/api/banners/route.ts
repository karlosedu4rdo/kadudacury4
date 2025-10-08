import { NextResponse } from 'next/server'

let bannersCache: any = null

export async function GET() {
  if (bannersCache) {
    return NextResponse.json(bannersCache)
  }
  
  return NextResponse.json({ banners: [], version: "1.0" })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    bannersCache = data
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 }
    )
  }
}

export const runtime = 'edge'

