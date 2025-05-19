'use client';

import { useEffect, useState } from 'react';
import { fetchGamelogs } from '@/components/utils/fetchGameLogs';
 
export interface GameLog {
  GAME_DATE: string;
  MATCHUP: string;
  PTS: number;
  REB: number;
  AST: number;
}

export default function PlayerStats() {
    const [games, setGames] = useState<GameLog[]>([]);

    useEffect(() => {
      fetchGamelogs("LeBron James", "2023")
        .then(setGames)
        .catch(console.error);
    }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">LeBron James - Last 10 Games</h2>
      <ul className="space-y-2">
        {games.map((game, i) => (
          <li key={i} className="bg-gray-100 p-2 rounde text-black">
            {game.GAME_DATE} – {game.MATCHUP} – PTS: {game.PTS}, REB: {game.REB}, AST: {game.AST}
          </li>
        ))}
      </ul>
    </div>
  );
}
