import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tests = await prisma.carTest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(tests)
  } catch (error) {
    console.error('Get tests error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const test = await prisma.carTest.create({
      data: body,
    })
    return NextResponse.json(test, { status: 201 })
  } catch (error) {
    console.error('Create test error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
