"use client";

import { useState, useMemo } from "react";

interface Player {
  name: string;
  points: number;
}

interface Settlement {
  from: string;
  to: string;
  pointDiff: number;
  amount: number;
}

interface NetResult {
  name: string;
  points: number;
  net: number;
}

const DEFAULT_STAKE = 0.25;

export default function Home() {
  const [stakePerPoint, setStakePerPoint] = useState(DEFAULT_STAKE);
  const [players, setPlayers] = useState<Player[]>([
    { name: "Player A", points: 0 },
    { name: "Player B", points: 0 },
    { name: "Player C", points: 0 },
    { name: "Player D", points: 0 },
  ]);

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };

  const updatePlayerPoints = (index: number, points: string) => {
    const newPlayers = [...players];
    const parsedPoints = parseFloat(points) || 0;
    newPlayers[index].points = parsedPoints;
    setPlayers(newPlayers);
  };

  const { settlements, netResults } = useMemo(() => {
    const settlements: Settlement[] = [];
    const netAmounts: { [key: string]: number } = {};

    // Initialize net amounts
    players.forEach((p) => {
      netAmounts[p.name] = 0;
    });

    // Calculate settlements between each pair
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const p1 = players[i];
        const p2 = players[j];
        const pointDiff = Math.abs(p1.points - p2.points);

        if (pointDiff > 0) {
          const amount = pointDiff * stakePerPoint;
          const winner = p1.points > p2.points ? p1 : p2;
          const loser = p1.points > p2.points ? p2 : p1;

          settlements.push({
            from: loser.name,
            to: winner.name,
            pointDiff,
            amount,
          });

          netAmounts[winner.name] += amount;
          netAmounts[loser.name] -= amount;
        }
      }
    }

    // Calculate net results
    const netResults: NetResult[] = players
      .map((p) => ({
        name: p.name,
        points: p.points,
        net: netAmounts[p.name],
      }))
      .sort((a, b) => b.net - a.net);

    return { settlements, netResults };
  }, [players, stakePerPoint]);

  const totalPoints = players.reduce((sum, p) => sum + p.points, 0);

  const resetAll = () => {
    setPlayers([
      { name: "Player A", points: 0 },
      { name: "Player B", points: 0 },
      { name: "Player C", points: 0 },
      { name: "Player D", points: 0 },
    ]);
    setStakePerPoint(DEFAULT_STAKE);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            🏌️ Dots
          </h1>
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

        {/* Player Inputs */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Enter Final Points</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {players.map((player, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-2 p-3 bg-white/5 rounded-lg"
              >
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Player name"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*\.?[0-9]*"
                  value={player.points || ""}
                  onChange={(e) => updatePlayerPoints(index, e.target.value)}
                  className="w-full sm:w-24 px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-mono text-lg"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center text-sm opacity-70">
            <span>
              Total Points: <strong>{totalPoints}</strong>
            </span>
            <button
              onClick={resetAll}
              className="px-4 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Settlements */}
        {settlements.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">💸 Settlements</h2>
            <div className="space-y-2">
              {settlements.map((s, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.from}</span>
                    <span className="text-green-400">→</span>
                    <span className="font-medium">{s.to}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-green-400">
                      ${s.amount.toFixed(2)}
                    </span>
                    <span className="text-xs opacity-60 ml-2">
                      ({s.pointDiff} pts)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Net Results */}
        {netResults.some((r) => r.net !== 0) && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📊 Net Results</h2>
            <div className="space-y-2">
              {netResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    result.net > 0
                      ? "bg-green-500/20"
                      : result.net < 0
                        ? "bg-red-500/20"
                        : "bg-white/5"
                  }`}
                >
                  <div>
                    <span className="font-medium">{result.name}</span>
                    <span className="text-sm opacity-60 ml-2">
                      ({result.points} pts)
                    </span>
                  </div>
                  <span
                    className={`font-mono font-bold text-lg ${
                      result.net > 0
                        ? "text-green-400"
                        : result.net < 0
                          ? "text-red-400"
                          : ""
                    }`}
                  >
                    {result.net > 0 ? "+" : ""}${result.net.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rules Reference */}
        <details className="mt-6 bg-white/5 rounded-xl p-4">
          <summary className="cursor-pointer font-semibold">
            📖 Quick Rules Reference
          </summary>
          <div className="mt-4 text-sm opacity-80 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Teams</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Off the 1st tee, the two players on the right and left are partners for the first 9 holes</li>
                <li>The team that loses the front 9 (lowest total) has the option to switch partners (flip a tee) or keep teams as-is for the back 9</li>
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
                <li><strong>Press:</strong> Before teeing off, the team behind can press — doubles points for EVERY remaining hole on that 9</li>
                <li><strong>Roll:</strong> After the first group tees off, the team behind can roll — doubles points for ONLY that hole</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payout</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Score is maintained on a total basis for the round</li>
                <li>At the end, add up total points per player and enter them into the calculator</li>
                <li>Each player settles with every other player based on point differential × stake per point</li>
                <li>Payments via Venmo or cash</li>
              </ul>
            </div>
          </div>
        </details>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm opacity-50">
          Dots Payout Calculator
        </footer>
      </div>
    </div>
  );
}
