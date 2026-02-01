"use client";

import { useState, useMemo } from "react";

interface Team {
  player1: string;
  player2: string;
  points: number;
}

interface NineHoles {
  team1: Team;
  team2: Team;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
  nine: "front" | "back";
}

interface PlayerNet {
  name: string;
  front9: number;
  back9: number;
  total: number;
}

const DEFAULT_STAKE = 0.25;

export default function Home() {
  const [stakePerPoint, setStakePerPoint] = useState(DEFAULT_STAKE);

  const [front9, setFront9] = useState<NineHoles>({
    team1: { player1: "Player A", player2: "Player B", points: 0 },
    team2: { player1: "Player C", player2: "Player D", points: 0 },
  });

  const [back9, setBack9] = useState<NineHoles>({
    team1: { player1: "Player A", player2: "Player C", points: 0 },
    team2: { player1: "Player B", player2: "Player D", points: 0 },
  });

  const updateFront9 = (team: "team1" | "team2", field: keyof Team, value: string) => {
    setFront9((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: field === "points" ? (parseFloat(value) || 0) : value,
      },
    }));
  };

  const updateBack9 = (team: "team1" | "team2", field: keyof Team, value: string) => {
    setBack9((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: field === "points" ? (parseFloat(value) || 0) : value,
      },
    }));
  };

  const { settlements, playerNets } = useMemo(() => {
    const settlements: Settlement[] = [];
    const playerAmounts: { [key: string]: { front9: number; back9: number } } = {};

    // Helper to initialize player
    const initPlayer = (name: string) => {
      if (!playerAmounts[name]) {
        playerAmounts[name] = { front9: 0, back9: 0 };
      }
    };

    // Calculate front 9 settlements
    // Each player pays/receives: point diff × stake
    // Split across 2 opponents, so each transaction is half
    const front9Diff = front9.team1.points - front9.team2.points;
    if (front9Diff !== 0) {
      const playerAmount = Math.abs(front9Diff) * stakePerPoint; // Total each player pays/receives
      const perTransaction = playerAmount / 2; // Split between 2 opponents
      const winners = front9Diff > 0 ? front9.team1 : front9.team2;
      const losers = front9Diff > 0 ? front9.team2 : front9.team1;

      // Each loser pays each winner (split across both)
      [losers.player1, losers.player2].forEach((loser) => {
        initPlayer(loser);
        [winners.player1, winners.player2].forEach((winner) => {
          initPlayer(winner);
          settlements.push({ from: loser, to: winner, amount: perTransaction, nine: "front" });
        });
        playerAmounts[loser].front9 -= playerAmount;
      });
      [winners.player1, winners.player2].forEach((winner) => {
        playerAmounts[winner].front9 += playerAmount;
      });
    }

    // Calculate back 9 settlements
    const back9Diff = back9.team1.points - back9.team2.points;
    if (back9Diff !== 0) {
      const playerAmount = Math.abs(back9Diff) * stakePerPoint;
      const perTransaction = playerAmount / 2;
      const winners = back9Diff > 0 ? back9.team1 : back9.team2;
      const losers = back9Diff > 0 ? back9.team2 : back9.team1;

      [losers.player1, losers.player2].forEach((loser) => {
        initPlayer(loser);
        [winners.player1, winners.player2].forEach((winner) => {
          initPlayer(winner);
          settlements.push({ from: loser, to: winner, amount: perTransaction, nine: "back" });
        });
        playerAmounts[loser].back9 -= playerAmount;
      });
      [winners.player1, winners.player2].forEach((winner) => {
        playerAmounts[winner].back9 += playerAmount;
      });
    }

    // Calculate net results per player
    const playerNets: PlayerNet[] = Object.entries(playerAmounts)
      .map(([name, amounts]) => ({
        name,
        front9: amounts.front9,
        back9: amounts.back9,
        total: amounts.front9 + amounts.back9,
      }))
      .sort((a, b) => b.total - a.total);

    return { settlements, playerNets };
  }, [front9, back9, stakePerPoint]);

  const resetAll = () => {
    setFront9({
      team1: { player1: "Player A", player2: "Player B", points: 0 },
      team2: { player1: "Player C", player2: "Player D", points: 0 },
    });
    setBack9({
      team1: { player1: "Player A", player2: "Player C", points: 0 },
      team2: { player1: "Player B", player2: "Player D", points: 0 },
    });
    setStakePerPoint(DEFAULT_STAKE);
  };

  const front9Settlements = settlements.filter((s) => s.nine === "front");
  const back9Settlements = settlements.filter((s) => s.nine === "back");

  const TeamInput = ({
    team,
    nine,
    teamKey,
    updateFn,
  }: {
    team: Team;
    nine: "front" | "back";
    teamKey: "team1" | "team2";
    updateFn: (team: "team1" | "team2", field: keyof Team, value: string) => void;
  }) => (
    <div className="bg-white/5 rounded-lg p-3 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={team.player1}
          onChange={(e) => updateFn(teamKey, "player1", e.target.value)}
          className="px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
          placeholder="Player 1"
        />
        <input
          type="text"
          value={team.player2}
          onChange={(e) => updateFn(teamKey, "player2", e.target.value)}
          className="px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-xs sm:text-sm"
          placeholder="Player 2"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-60">Team Points:</span>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*\.?[0-9]*"
          value={team.points || ""}
          onChange={(e) => updateFn(teamKey, "points", e.target.value)}
          className="flex-1 px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-mono text-base"
          placeholder="0"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">🏌️ Dots</h1>
          <p className="text-lg opacity-80">Payout Calculator</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-sm opacity-60">$</span>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              value={stakePerPoint}
              onChange={(e) => setStakePerPoint(parseFloat(e.target.value) || 0)}
              className="w-20 px-2 py-1 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-mono text-sm"
            />
            <span className="text-sm opacity-60">per point</span>
          </div>
        </div>

        {/* Front 9 */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Front 9</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-sm font-medium mb-2 opacity-70">Team 1</div>
              <TeamInput team={front9.team1} nine="front" teamKey="team1" updateFn={updateFront9} />
            </div>
            <div>
              <div className="text-sm font-medium mb-2 opacity-70">Team 2</div>
              <TeamInput team={front9.team2} nine="front" teamKey="team2" updateFn={updateFront9} />
            </div>
          </div>
          {front9Settlements.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-sm font-medium mb-2 opacity-70">Front 9 Settlements</div>
              <div className="space-y-1">
                {front9Settlements.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {s.from} → {s.to}
                    </span>
                    <span className="font-mono text-green-400">${s.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back 9 */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Back 9</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-sm font-medium mb-2 opacity-70">Team 1</div>
              <TeamInput team={back9.team1} nine="back" teamKey="team1" updateFn={updateBack9} />
            </div>
            <div>
              <div className="text-sm font-medium mb-2 opacity-70">Team 2</div>
              <TeamInput team={back9.team2} nine="back" teamKey="team2" updateFn={updateBack9} />
            </div>
          </div>
          {back9Settlements.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-sm font-medium mb-2 opacity-70">Back 9 Settlements</div>
              <div className="space-y-1">
                {back9Settlements.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {s.from} → {s.to}
                    </span>
                    <span className="font-mono text-green-400">${s.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={resetAll}
            className="px-4 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-sm"
          >
            Reset All
          </button>
        </div>

        {/* Net Results */}
        {playerNets.length > 0 && playerNets.some((p) => p.total !== 0) && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📊 Final Results</h2>
            <div className="space-y-2">
              {playerNets.map((player, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    player.total > 0
                      ? "bg-green-500/20"
                      : player.total < 0
                        ? "bg-red-500/20"
                        : "bg-white/5"
                  }`}
                >
                  <div>
                    <span className="font-medium">{player.name}</span>
                    <div className="text-xs opacity-60">
                      F9: {player.front9 >= 0 ? "+" : ""}${player.front9.toFixed(2)} | B9:{" "}
                      {player.back9 >= 0 ? "+" : ""}${player.back9.toFixed(2)}
                    </div>
                  </div>
                  <span
                    className={`font-mono font-bold text-lg ${
                      player.total > 0 ? "text-green-400" : player.total < 0 ? "text-red-400" : ""
                    }`}
                  >
                    {player.total > 0 ? "+" : ""}${player.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rules Reference */}
        <details className="mt-6 bg-white/5 rounded-xl p-4">
          <summary className="cursor-pointer font-semibold">📖 Quick Rules Reference</summary>
          <div className="mt-4 text-sm opacity-80 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Teams</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Off the 1st tee, the two players on the right and left are partners for the first
                  9 holes
                </li>
                <li>
                  The team that loses the front 9 (lowest total) has the option to switch partners
                  (flip a tee) or keep teams as-is for the back 9
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Points (6 available per hole)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>1 point for GIR (Green in Regulation)</li>
                <li>2 points for low-man (net)</li>
                <li>2 points for low-team (net)</li>
                <li>1 point for birdie (gross only)</li>
                <li>If a team gets all 6 points on a hole, points are doubled to 12</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Press & Roll</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Team in the lead tees off first each hole</li>
                <li>
                  <strong>Press:</strong> Before teeing off, the team behind can press — doubles
                  points for EVERY remaining hole on that 9
                </li>
                <li>
                  <strong>Roll:</strong> After the first group tees off, the team behind can roll —
                  doubles points for ONLY that hole
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payout</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>At the end of each 9, calculate team point differential</li>
                <li>Each player on the losing team pays each player on the winning team</li>
                <li>Payment = point differential × stake per point</li>
                <li>Payments via Venmo or cash</li>
              </ul>
            </div>
          </div>
        </details>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm opacity-50">Dots Payout Calculator</footer>
      </div>
    </div>
  );
}
