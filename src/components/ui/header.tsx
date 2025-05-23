"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllPlayers } from "@/src/app/api/players/route";
import { Player } from "@/src/app/api/players/[player_id]/route";

const Header = () => {
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<Player[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    // 🔽 Fetch players client-side
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await fetch("/api/players");
                const data = await res.json();
                setPlayerList(data);
            } catch (err) {
                console.error("Failed to fetch players:", err);
            }
        };
        fetchPlayers();
    }, []);
    console.log(playerList);

    // 🔍 Filter as you type
    useEffect(() => {
        if (search.length > 0) {
            const matches = playerList.filter(player => {
                const nameMatches = [
                    player.full_name,
                    player.first_name,
                    player.last_name
                ]
                    .filter(Boolean) // Remove undefined/null
                    .some(name =>
                        name!.toLowerCase().includes(search.toLowerCase())
                    );
                return nameMatches;
            });

            setFiltered(matches.slice(0, 5)); // ⛔ Limit to 5
            setShowDropdown(matches.length > 0);
        } else {
            setFiltered([]);
            setShowDropdown(false);
        }
    }, [search, playerList]);


    const handleSelect = (playerId: number) => {
        router.push(`/players/${playerId}`);
        setSearch("");
        setShowDropdown(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?query=${encodeURIComponent(search)}`);
        setShowDropdown(false);
    };

    return (
        <header className="flex items-center justify-left p-4 bg-gray-800 text-white relative">
            <span className="text-2xl font-bold ml-4">Ball Stats</span>

            <nav className="ml-4">
                <ul className="space-x-4 text-sm">
                    <li><a href="/">NBA Teams</a></li>
                </ul>
            </nav>

            
            <form onSubmit={handleSubmit} className="">
                <input
                    type="text"
                    placeholder="Search players..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 text-white rounded ml-4 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showDropdown && filtered.length > 0 && (
                    <ul className="absolute z-10 w-md ml-4 bg-white text-black mt-1 rounded-lg shadow">
                        {filtered.map(player => (
                            <li
                                key={player.player_id}
                                onClick={() => handleSelect(player.player_id)}
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-lg"
                            >
                                {player.full_name}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </header>
    );
};

export default Header;