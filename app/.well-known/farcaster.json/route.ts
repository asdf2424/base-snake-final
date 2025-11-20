import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://base-snake-final-kkm74t0cu-ygtp2424gmailcoms-projects.vercel.app'
  
  const manifest = {
    name: 'Base Snake Final',
    description: 'Modern Snake oyunu - Next.js, TypeScript, Tailwind CSS ve Framer Motion ile geliştirilmiş',
    iconUrl: `${baseUrl}/icon.png`,
    appUrl: baseUrl,
    accountAssociation: {
      header: 'x-farcaster-verify',
      payload: 'accountAddress',
    },
    frame: {
      version: 'next',
      imageUrl: `${baseUrl}/og-image.png`,
      button: {
        title: 'Play Snake Game',
        action: {
          type: 'launch_frame',
          name: 'snake_game',
          url: baseUrl,
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

