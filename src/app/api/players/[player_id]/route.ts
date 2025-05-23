import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { player_id: string } }) {
  const playerId = await parseInt(params.player_id);

  if (isNaN(playerId)) {
    return NextResponse.json({ error: 'Invalid player ID' }, { status: 400 });
  }

  const player = await prisma.player_list.findUnique({
    where: { player_id: playerId },
    include: { game_stats: true },

  });

  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  return NextResponse.json(player);
}

export type Player = {
  player_id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  game_stats: {
    id: number;
    game_date: string;
    matchup: string;
    points: number;
    assists: number;
    rebounds: number;
    steals: number;
    blocks: number;
    turnovers: number;
    personal_fouls: number;
    minutes: string;
  }[];
};

export async function getPlayer(player_id: string): Promise<Player> {
  const res = await fetch(`http://localhost:3000/api/players/${player_id}`, {
    cache: 'no-store', // disable caching in dev
  });

  if (!res.ok) throw new Error('Failed to fetch player data');
  return res.json();
}