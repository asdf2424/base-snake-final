import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: 'x-farcaster-verify',
      payload: 'accountAddress',
    },
    frame: {
      version: 'next',
      imageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://base-snake-final-zlufz9vgu-ygtp2424gmailcoms-projects.vercel.app'}/og-image.png`,
      button: {
        title: 'Play Snake Game',
        action: {
          type: 'launch_frame',
          name: 'snake_game',
          url: process.env.NEXT_PUBLIC_APP_URL || 'https://base-snake-final-zlufz9vgu-ygtp2424gmailcoms-projects.vercel.app',
        },
      },
    },
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

