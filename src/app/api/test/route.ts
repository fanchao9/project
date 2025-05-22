import { prisma } from '@/lib/prisma';

export async function GET() {
  const players = await prisma.player_list.findMany({ take: 1 });
  return Response.json(players);
}
