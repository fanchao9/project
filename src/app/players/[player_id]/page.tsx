// src/app/players/[player_id]/page.tsx

import React from 'react';

type Player = {
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

async function getPlayer(player_id: string): Promise<Player> {
  const res = await fetch(`http://localhost:3000/api/players/${player_id}`, {
    cache: 'no-store', // disable caching in dev
  });

  if (!res.ok) throw new Error('Failed to fetch player data');
  return res.json();
}

export default async function PlayerPage({ params }: { params: { player_id: string } }) {
  const player = await getPlayer(params.player_id);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{player.full_name}</h1>
      <p className="mb-2 text-gray-600">Active: {player.is_active ? 'Yes' : 'No'}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Game Stats</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Matchup</th>
              <th className="p-2 border">PTS</th>
              <th className="p-2 border">AST</th>
              <th className="p-2 border">REB</th>
              <th className="p-2 border">STL</th>
              <th className="p-2 border">BLK</th>
              <th className="p-2 border">TO</th>
              <th className="p-2 border">PF</th>
              <th className="p-2 border">MIN</th>
            </tr>
          </thead>
          <tbody>
            {player.game_stats.map((game) => (
              <tr key={game.id}>
                <td className="p-2 border">{game.game_date}</td>
                <td className="p-2 border">{game.matchup}</td>
                <td className="p-2 border">{game.points}</td>
                <td className="p-2 border">{game.assists}</td>
                <td className="p-2 border">{game.rebounds}</td>
                <td className="p-2 border">{game.steals}</td>
                <td className="p-2 border">{game.blocks}</td>
                <td className="p-2 border">{game.turnovers}</td>
                <td className="p-2 border">{game.personal_fouls}</td>
                <td className="p-2 border">{game.minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
