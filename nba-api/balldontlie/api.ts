import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: "bc019f6e-ecc2-4ac3-9d8f-fc58dc4f3c1c" });
const teams = await api.nba.getTeams();
const nbaTeams = teams.data.slice(0, 30);
const players = await api.nba.getPlayers();
const warriors = await api.nba.getPlayers({ team_ids: [10]});
const steph = await api.nba.getPlayer(19);
const steph2 = await api.nba.getPlayers({ first_name: "Stephen", last_name: "Curry" });

export { teams, nbaTeams, players, warriors, steph, steph2 } ;