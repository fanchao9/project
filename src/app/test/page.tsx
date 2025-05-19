'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';

export default function PlayerSearch() {
  const [name, setName] = useState('');
  const [searchName, setSearchName] = useState('');
  
  const { data, isLoading, error } = api.player.getPlayer.useQuery(
    { id: 237 }, // only run when searchName is set
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchName(name);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search player"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data?.data?.length ? (
        <ul className="space-y-2">
          {data.data.map((player: any) => (
            <li key={player.id} className="border p-2 rounded">
              {player.first_name} {player.last_name} - {player.team.full_name}
            </li>
          ))}
        </ul>
      ) : searchName && !isLoading ? (
        <p>No players found.</p>
      ) : null}
    </div>
  );
}
