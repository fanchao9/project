import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust path if needed
import { Player } from './[player_id]/route'; // Adjust path if needed

export async function GET() {
  try {
    const players = await prisma.player_list.findMany({
      select: {
        player_id: true,
        full_name: true,
      },
      orderBy: {
        full_name: 'asc',
      },
    });

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function getAllPlayers(): Promise<Player[]> {
  const res = await fetch('http://localhost:3000/api/players', {
    cache: 'no-store', // disable caching in dev
  });

  if (!res.ok) throw new Error('Failed to fetch players data');
  return res.json();
}
