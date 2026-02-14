"use client";

import { useState, useMemo } from "react";

type Pairing = "AB_CD" | "AC_BD" | "AD_BC";
type GameMode = "9hole" | "6hole";

const DEFAULT_STAKE = 0.25;

const PAIRING_OPTIONS: { value: Pairing; label: string }[] = [
  { value: "AB_CD", label: "A & B vs C & D" },
  { value: "AC_BD", label: "A & C vs B & D" },
  { value: "AD_BC", label: "A & D vs B & C" },
];

const getTeamsForPairing = (pairing: Pairing, players: string[]) => {
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

const getTeamLabelForPairing = (pairing: Pairing, team: 1 | 2, players: string[]) => {
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

// Segment section component defined outside Home to prevent re-mounting on state changes
function SegmentSection({
  title,
  pairing,
  setPairing,
  team1Points,
  setTeam1Points,
  team2Points,
  setTeam2Points,
  players,
  stakePerPoint,
}: {
  title: string;
  pairing: Pairing;
  setPairing: (p: Pairing) => void;
  team1Points: number;
  setTeam1Points: (p: number) => void;
  team2Points: number;
  setTeam2Points: (p: number) => void;
  players: string[];
  stakePerPoint: number;
}) {
  const pointDiff = team1Points - team2Points;
  const teams = getTeamsForPairing(pairing, players);
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
          <div className="text-xs opacity-70 mb-1 truncate">
            {getTeamLabelForPairing(pairing, 1, players)}
          </div>
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
          <div className="text-xs opacity-70 mb-1 truncate">
            {getTeamLabelForPairing(pairing, 2, players)}
          </div>
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

      {/* Per-segment results */}
      {pointDiff !== 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-sm font-medium mb-2 opacity-70">{title} Results</div>
          <div className="grid grid-cols-2 gap-2">
            {losers.map((player) => (
              <div
                key={player}
                className="flex justify-between text-sm bg-red-500/10 rounded px-2 py-1"
              >
                <span>{player}</span>
                <span className="font-mono text-red-400">-${playerAmount.toFixed(2)}</span>
              </div>
            ))}
            {winners.map((player) => (
              <div
                key={player}
                className="flex justify-between text-sm bg-green-500/10 rounded px-2 py-1"
              >
                <span>{player}</span>
                <span className="font-mono text-green-400">+${playerAmount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>("9hole");
  const [stakePerPoint, setStakePerPoint] = useState(DEFAULT_STAKE);
  const [players, setPlayers] = useState(["Player A", "Player B", "Player C", "Player D"]);

  // Segment 1: Front 9 or Holes 1-6
  const [seg1Pairing, setSeg1Pairing] = useState<Pairing>("AB_CD");
  const [seg1Team1Points, setSeg1Team1Points] = useState(0);
  const [seg1Team2Points, setSeg1Team2Points] = useState(0);

  // Segment 2: Back 9 or Holes 7-12
  const [seg2Pairing, setSeg2Pairing] = useState<Pairing>("AB_CD");
  const [seg2Team1Points, setSeg2Team1Points] = useState(0);
  const [seg2Team2Points, setSeg2Team2Points] = useState(0);

  // Segment 3: Holes 13-18 (6-hole mode only)
  const [seg3Pairing, setSeg3Pairing] = useState<Pairing>("AB_CD");
  const [seg3Team1Points, setSeg3Team1Points] = useState(0);
  const [seg3Team2Points, setSeg3Team2Points] = useState(0);

  const segmentLabels = gameMode === "9hole"
    ? ["Front 9", "Back 9"]
    : ["Holes 1–6", "Holes 7–12", "Holes 13–18"];

  const segmentShortLabels = gameMode === "9hole"
    ? ["F9", "B9"]
    : ["1–6", "7–12", "13–18"];

  const updatePlayerName = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const calcSegment = (pairing: Pairing, team1Points: number, team2Points: number) => {
    const teams = getTeamsForPairing(pairing, players);
    const diff = team1Points - team2Points;
    const amounts: { [key: string]: number } = {};
    players.forEach((name) => { amounts[name] = 0; });

    if (diff !== 0) {
      const playerAmount = Math.abs(diff) * stakePerPoint;
      const winners = diff > 0 ? teams.team1 : teams.team2;
      const losers = diff > 0 ? teams.team2 : teams.team1;
      losers.forEach((l) => { amounts[l] -= playerAmount; });
      winners.forEach((w) => { amounts[w] += playerAmount; });
    }
    return amounts;
  };

  const playerNets = useMemo(() => {
    const seg1 = calcSegment(seg1Pairing, seg1Team1Points, seg1Team2Points);
    const seg2 = calcSegment(seg2Pairing, seg2Team1Points, seg2Team2Points);
    const seg3 = gameMode === "6hole"
      ? calcSegment(seg3Pairing, seg3Team1Points, seg3Team2Points)
      : null;

    return players
      .map((name) => {
        const segments = [seg1[name], seg2[name]];
        if (seg3) segments.push(seg3[name]);
        const total = segments.reduce((sum, v) => sum + v, 0);
        return { name, segments, total };
      })
      .sort((a, b) => b.total - a.total);
  }, [
    players,
    gameMode,
    seg1Pairing, seg1Team1Points, seg1Team2Points,
    seg2Pairing, seg2Team1Points, seg2Team2Points,
    seg3Pairing, seg3Team1Points, seg3Team2Points,
    stakePerPoint,
  ]);

  const resetAll = () => {
    setPlayers(["Player A", "Player B", "Player C", "Player D"]);
    setSeg1Pairing("AB_CD");
    setSeg1Team1Points(0);
    setSeg1Team2Points(0);
    setSeg2Pairing("AB_CD");
    setSeg2Team1Points(0);
    setSeg2Team2Points(0);
    setSeg3Pairing("AB_CD");
    setSeg3Team1Points(0);
    setSeg3Team2Points(0);
    setStakePerPoint(DEFAULT_STAKE);
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

        {/* Game Mode Selector */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Game Format</h2>
          <select
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            <option value="9hole" className="bg-gray-800">9-Hole Pairings (Front 9 / Back 9)</option>
            <option value="6hole" className="bg-gray-800">6-Hole Pairings (switch every 6 holes)</option>
          </select>
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

        {/* Segment 1 */}
        <SegmentSection
          title={segmentLabels[0]}
          pairing={seg1Pairing}
          setPairing={setSeg1Pairing}
          team1Points={seg1Team1Points}
          setTeam1Points={setSeg1Team1Points}
          team2Points={seg1Team2Points}
          setTeam2Points={setSeg1Team2Points}
          players={players}
          stakePerPoint={stakePerPoint}
        />

        {/* Segment 2 */}
        <SegmentSection
          title={segmentLabels[1]}
          pairing={seg2Pairing}
          setPairing={setSeg2Pairing}
          team1Points={seg2Team1Points}
          setTeam1Points={setSeg2Team1Points}
          team2Points={seg2Team2Points}
          setTeam2Points={setSeg2Team2Points}
          players={players}
          stakePerPoint={stakePerPoint}
        />

        {/* Segment 3 (6-hole mode only) */}
        {gameMode === "6hole" && (
          <SegmentSection
            title={segmentLabels[2]}
            pairing={seg3Pairing}
            setPairing={setSeg3Pairing}
            team1Points={seg3Team1Points}
            setTeam1Points={setSeg3Team1Points}
            team2Points={seg3Team2Points}
            setTeam2Points={setSeg3Team2Points}
            players={players}
            stakePerPoint={stakePerPoint}
          />
        )}

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
                      {player.segments.map((amt, i) => (
                        <span key={i}>
                          {i > 0 && " | "}
                          {segmentShortLabels[i]}: {amt >= 0 ? "+" : ""}${amt.toFixed(2)}
                        </span>
                      ))}
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
                  segment
                </li>
                <li>
                  <strong>9-Hole mode:</strong> The losing team after the front 9 can switch partners
                  (flip a tee) or keep teams for the back 9
                </li>
                <li>
                  <strong>6-Hole mode:</strong> Teams can be re-selected every 6 holes (3 segments
                  per round)
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
                  points for EVERY remaining hole in that segment
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
                <li>At the end of each segment, calculate team point differential</li>
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
