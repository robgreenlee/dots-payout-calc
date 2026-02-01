"use client";

import { useState, useMemo } from "react";

type Pairing = "AB_CD" | "AC_BD" | "AD_BC";

interface PlayerNet {
  name: string;
  front9: number;
  back9: number;
  total: number;
}

const DEFAULT_STAKE = 0.25;

const PAIRING_OPTIONS: { value: Pairing; label: string }[] = [
  { value: "AB_CD", label: "A & B vs C & D" },
  { value: "AC_BD", label: "A & C vs B & D" },
  { value: "AD_BC", label: "A & D vs B & C" },
];

export default function Home() {
  const [stakePerPoint, setStakePerPoint] = useState(DEFAULT_STAKE);
  const [players, setPlayers] = useState(["Player A", "Player B", "Player C", "Player D"]);

  const [front9Pairing, setFront9Pairing] = useState<Pairing>("AB_CD");
  const [front9Team1Points, setFront9Team1Points] = useState(0);
  const [front9Team2Points, setFront9Team2Points] = useState(0);

  const [back9Pairing, setBack9Pairing] = useState<Pairing>("AB_CD");
  const [back9Team1Points, setBack9Team1Points] = useState(0);
  const [back9Team2Points, setBack9Team2Points] = useState(0);

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const getTeams = (pairing: Pairing) => {
    const [A, B, C, D] = players;
    switch (pairing) {
      case "AB_CD":
        return { team1: [A, B], team2: [C, D] };
      case "AC_BD":
        return { team1: [A, C], team2: [B, D] };
      case "AD_BC":
        return { team1: [A, D], team2: [B, C] };
    }
  };

  const getTeamLabel = (pairing: Pairing, team: 1 | 2) => {
    const [A, B, C, D] = players;
    switch (pairing) {
      case "AB_CD":
        return team === 1 ? `${A} & ${B}` : `${C} & ${D}`;
      case "AC_BD":
        return team === 1 ? `${A} & ${C}` : `${B} & ${D}`;
      case "AD_BC":
        return team === 1 ? `${A} & ${D}` : `${B} & ${C}`;
    }
  };

  const playerNets = useMemo(() => {
    const playerAmounts: { [key: string]: { front9: number; back9: number } } = {};

    // Initialize all players
    players.forEach((name) => {
      playerAmounts[name] = { front9: 0, back9: 0 };
    });

    // Calculate front 9
    const front9Teams = getTeams(front9Pairing);
    const front9Diff = front9Team1Points - front9Team2Points;
    if (front9Diff !== 0) {
      const playerAmount = Math.abs(front9Diff) * stakePerPoint;
      const winners = front9Diff > 0 ? front9Teams.team1 : front9Teams.team2;
      const losers = front9Diff > 0 ? front9Teams.team2 : front9Teams.team1;

      losers.forEach((loser) => {
        playerAmounts[loser].front9 -= playerAmount;
      });
      winners.forEach((winner) => {
        playerAmounts[winner].front9 += playerAmount;
      });
    }

    // Calculate back 9
    const back9Teams = getTeams(back9Pairing);
    const back9Diff = back9Team1Points - back9Team2Points;
    if (back9Diff !== 0) {
      const playerAmount = Math.abs(back9Diff) * stakePerPoint;
      const winners = back9Diff > 0 ? back9Teams.team1 : back9Teams.team2;
      const losers = back9Diff > 0 ? back9Teams.team2 : back9Teams.team1;

      losers.forEach((loser) => {
        playerAmounts[loser].back9 -= playerAmount;
      });
      winners.forEach((winner) => {
        playerAmounts[winner].back9 += playerAmount;
      });
    }

    return Object.entries(playerAmounts)
      .map(([name, amounts]) => ({
        name,
        front9: amounts.front9,
        back9: amounts.back9,
        total: amounts.front9 + amounts.back9,
      }))
      .sort((a, b) => b.total - a.total);
  }, [players, front9Pairing, front9Team1Points, front9Team2Points, back9Pairing, back9Team1Points, back9Team2Points, stakePerPoint]);

  const resetAll = () => {
    setPlayers(["Player A", "Player B", "Player C", "Player D"]);
    setFront9Pairing("AB_CD");
    setFront9Team1Points(0);
    setFront9Team2Points(0);
    setBack9Pairing("AB_CD");
    setBack9Team1Points(0);
    setBack9Team2Points(0);
    setStakePerPoint(DEFAULT_STAKE);
  };

  const NineSection = ({
    title,
    pairing,
    setPairing,
    team1Points,
    setTeam1Points,
    team2Points,
    setTeam2Points,
  }: {
    title: string;
    pairing: Pairing;
    setPairing: (p: Pairing) => void;
    team1Points: number;
    setTeam1Points: (p: number) => void;
    team2Points: number;
    setTeam2Points: (p: number) => void;
  }) => {
    const pointDiff = team1Points - team2Points;
    const teams = getTeams(pairing);
    const playerAmount = Math.abs(pointDiff) * stakePerPoint;
    const winners = pointDiff > 0 ? teams.team1 : teams.team2;
    const losers = pointDiff > 0 ? teams.team2 : teams.team1;

    return (
      <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Pairing Selector */}
        <div className="mb-4">
          <label className="text-sm opacity-70 block mb-1">Team Pairing</label>
          <select
            value={pairing}
            onChange={(e) => setPairing(e.target.value as Pairing)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            {PAIRING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-gray-800">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Team Points */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs opacity-70 mb-1 truncate">{getTeamLabel(pairing, 1)}</div>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              value={team1Points || ""}
              onChange={(e) => setTeam1Points(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-mono text-lg"
              placeholder="0"
            />
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs opacity-70 mb-1 truncate">{getTeamLabel(pairing, 2)}</div>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              value={team2Points || ""}
              onChange={(e) => setTeam2Points(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-mono text-lg"
              placeholder="0"
            />
          </div>
        </div>

        {/* Per-player results for this 9 */}
        {pointDiff !== 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-sm font-medium mb-2 opacity-70">{title} Results</div>
            <div className="grid grid-cols-2 gap-2">
              {losers.map((player) => (
                <div key={player} className="flex justify-between text-sm bg-red-500/10 rounded px-2 py-1">
                  <span>{player}</span>
                  <span className="font-mono text-red-400">-${playerAmount.toFixed(2)}</span>
                </div>
              ))}
              {winners.map((player) => (
                <div key={player} className="flex justify-between text-sm bg-green-500/10 rounded px-2 py-1">
                  <span>{player}</span>
                  <span className="font-mono text-green-400">+${playerAmount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
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

        {/* Player Names */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Players</h2>
          <div className="grid grid-cols-2 gap-2">
            {players.map((name, index) => (
              <input
                key={index}
                type="text"
                value={name}
                onChange={(e) => updatePlayerName(index, e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder={`Player ${String.fromCharCode(65 + index)}`}
              />
            ))}
          </div>
        </div>

        {/* Front 9 */}
        <NineSection
          title="Front 9"
          pairing={front9Pairing}
          setPairing={setFront9Pairing}
          team1Points={front9Team1Points}
          setTeam1Points={setFront9Team1Points}
          team2Points={front9Team2Points}
          setTeam2Points={setFront9Team2Points}
        />

        {/* Back 9 */}
        <NineSection
          title="Back 9"
          pairing={back9Pairing}
          setPairing={setBack9Pairing}
          team1Points={back9Team1Points}
          setTeam1Points={setBack9Team1Points}
          team2Points={back9Team2Points}
          setTeam2Points={setBack9Team2Points}
        />

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
        {playerNets.some((p) => p.total !== 0) && (
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
