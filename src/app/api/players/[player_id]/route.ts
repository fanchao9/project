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
