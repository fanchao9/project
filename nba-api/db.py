import mysql.connector
from nba_api.stats.static import players
from nba_api.stats.endpoints import playergamelog
from datetime import datetime
import time

# ---------------------
# Database connection
# ---------------------
print("🔌 Connecting to MySQL...")
conn = mysql.connector.connect(
    host="localhost",
    user="user",
    password="pw"
)
cursor = conn.cursor()

print("📂 Creating schema and tables...")
cursor.execute("CREATE DATABASE IF NOT EXISTS ball_stats")
cursor.execute("USE ball_stats")

# Player list table
cursor.execute("""
CREATE TABLE IF NOT EXISTS player_list (
    player_id INT PRIMARY KEY,
    full_name VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    is_active BOOLEAN
)
""")

# Game stats table
cursor.execute("""
CREATE TABLE IF NOT EXISTS game_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    game_date DATE,
    matchup VARCHAR(20),
    minutes VARCHAR(10),
    points FLOAT,
    assists FLOAT,
    rebounds FLOAT,
    steals FLOAT,
    blocks FLOAT,
    turnovers FLOAT,
    personal_fouls FLOAT,
    FOREIGN KEY (player_id) REFERENCES player_list(player_id)
)
""")

# ---------------------
# Populate player list
# ---------------------
print("👥 Fetching and inserting players...")
active_players = players.get_active_players()

for p in active_players:
    cursor.execute("""
    INSERT IGNORE INTO player_list (player_id, full_name, first_name, last_name, is_active)
    VALUES (%s, %s, %s, %s, %s)
    """, (
        p['id'], p['full_name'], p['first_name'], p['last_name'], True
    ))
conn.commit()
print(f"✅ Inserted {len(active_players)} players.")

# ---------------------
# Populate game stats
# ---------------------
print("📊 Fetching game logs for all players...")
for index, p in enumerate(active_players):
    player_id = p['id']
    print(f"\n[{index + 1}/{len(active_players)}] 🏀 Processing {p['full_name']} (ID: {player_id})")

    try:
        logs = playergamelog.PlayerGameLog(player_id=player_id, season='2024-25')
        df = logs.get_data_frames()[0]

        for _, row in df.iterrows():
            parsed_date = datetime.strptime(row['GAME_DATE'], '%b %d, %Y').date()

            cursor.execute("""
            INSERT INTO game_stats (
                player_id, game_date, matchup, minutes,
                points, assists, rebounds, steals,
                blocks, turnovers, personal_fouls
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                player_id,
                parsed_date,
                row['MATCHUP'],
                row['MIN'],
                row['PTS'],
                row['AST'],
                row['REB'],
                row['STL'],
                row['BLK'],
                row['TOV'],
                row['PF']
            ))

        conn.commit()
        print(f"   ✅ {len(df)} games inserted for {p['full_name']}")
        if (len(df) == 0):
            continue
        else: 
            time.sleep(1)  # Rate limiting

    except Exception as e:
        print(f"   ❌ Failed for player {player_id}: {e}")

# ---------------------
# Wrap up
# ---------------------
cursor.close()
conn.close()
print("\n🎉 All done! Database updated.")
