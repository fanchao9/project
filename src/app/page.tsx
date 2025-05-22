import Image from "next/image";
import { teams, nbaTeams, warriors, players, steph, steph2 } from "../../nba-api/balldontlie/api";

export default function Home() {

  //const teamNames = nbaTeams.map((team) => team.full_name);
  //console.log(warriors);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-4 items-center sm:items-start">
        {/* <div className="flex flex-col gap-4 bg-white text-black">
          {teamNames.map((team) => (
            <div
              key={team}
              className="bg-gray-100 rounded-lg p-2 rounded text-black"
            >
              {team}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 bg-white text-black">
          {warriors.data.map((player) => (
            <div
              key={player.id}
              className="bg-gray-100 rounded-lg p-2 rounded text-black"
            >
              {player.first_name} {player.last_name} - {player.team.full_name}
            </div>
          ))}
        </div>
        <div>{steph2.data.map((steph) => (
          <div
            key={steph.id}
            className="bg-gray-100 rounded-lg p-2 rounded text-black"
          >
            {steph.first_name} {steph.last_name} - {steph.team.full_name}
          </div>
        ))}
        </div> */}
      </main>
    </div>
  );
}
