

export default async function Home() {

  //const teamNames = nbaTeams.map((team) => team.full_name);
  //console.log(warriors);

  const res = await fetch('http://localhost:3000/api/players/2544');
  console.log(res.json);
  //const player = await res.json();
  //console.log(player.full_name);


  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-4 items-center sm:items-start">

      </main>
    </div>
  );
}
