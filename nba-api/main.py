from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nba_api.stats.endpoints import playergamelog
from nba_api.stats.static import players

app = FastAPI()

# Allow your Next.js frontend to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to your Next.js domain
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/gamelogs")
def get_gamelogs(name: str = "LeBron James", season: str = "2024"):
    player = [p for p in players.get_players() if p["full_name"] == name]
    if not player:
        return {"error": "Player not found"}

    player_id = player[0]["id"]
    gamelog = playergamelog.PlayerGameLog(player_id=player_id, season=season, season_type_all_star="Regular Season")
    df = gamelog.get_data_frames()[0]

    return df[["GAME_DATE", "MATCHUP", "PTS", "REB", "AST"]].head(10).to_dict(orient="records")
