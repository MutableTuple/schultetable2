"use client";
import React from "react";
import { FaTrophy, FaGamepad, FaBullseye, FaClock } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "../utils/formatNumber";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
export default function Account({ session, user_stats, loggedin_user }) {
  const totalRightClicks = user_stats.reduce(
    (acc, game) => acc + game.total_right_click,
    0
  );
  const totalWrongClicks = user_stats.reduce(
    (acc, game) => acc + game.total_wrong_click,
    0
  );
  const totalGamesPlayed = user_stats.length;

  const fastestGame = user_stats.reduce(
    (fastest, game) => (game.time_taken < fastest.time_taken ? game : fastest),
    user_stats[0]
  );

  const slowestGame = user_stats.reduce(
    (slowest, game) => (game.time_taken > slowest.time_taken ? game : slowest),
    user_stats[0]
  );

  const performanceData = user_stats.map((game, index) => ({
    game: index + 1,
    rightClicks: game.total_right_click,
    wrongClicks: game.total_wrong_click,
  }));

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8 space-y-8">
      {/* Profile Section */}
      <section className="bg-white rounded-2xl p-6 border border-zinc-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-600 text-white text-2xl flex items-center justify-center rounded-xl font-medium uppercase">
              {loggedin_user[0].name.slice(0, 2) || "NA"}
            </div>
            <div className="text-center md:text-left flex md:flex-row flex-col gap-2 items-center">
              <h1 className="text-2xl font-medium text-zinc-900">
                {loggedin_user[0].name || "NA"}
              </h1>
              <Link
                href="/profile"
                className="flex gap-1 items-center hover:text-green-700"
              >
                <FaRegEdit /> (edit profile)
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-lg">
            <FaTrophy className="text-amber-500 text-xl" />
            <span className="text-amber-700 font-medium">
              {formatNumber(loggedin_user[0].score)} Points
            </span>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: <FaGamepad className="text-indigo-500" />,
            label: "Games Played",
            value: totalGamesPlayed,
            color: "bg-indigo-50",
          },
          {
            icon: <FaBullseye className="text-emerald-500" />,
            label: "Right Clicks",
            value: totalRightClicks,
            color: "bg-emerald-50",
          },
          {
            icon: <FaBullseye className="text-rose-500" />,
            label: "Wrong Clicks",
            value: totalWrongClicks,
            color: "bg-rose-50",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-xl p-4 flex items-center gap-4`}
          >
            <div className="text-2xl">{stat.icon}</div>
            <div>
              <p className="text-zinc-600 text-sm">{stat.label}</p>
              <p className="text-xl font-medium mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Performance Chart */}
      <section className="bg-white rounded-2xl p-6 border border-zinc-100">
        <h2 className="text-xl font-medium text-zinc-900 mb-6">
          Performance History
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis
                dataKey="game"
                label={{
                  value: "Game Number",
                  position: "insideBottom",
                  offset: -5,
                }}
                stroke="#71717a"
              />
              <YAxis stroke="#71717a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fafafa",
                  border: "1px solid #e4e4e7",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="rightClicks"
                stroke="#059669"
                strokeWidth={2}
                name="Right Clicks"
                dot={{ fill: "#059669" }}
              />
              <Line
                type="monotone"
                dataKey="wrongClicks"
                stroke="#e11d48"
                strokeWidth={2}
                name="Wrong Clicks"
                dot={{ fill: "#e11d48" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Game History */}
      <section className="bg-white rounded-2xl p-6 border border-zinc-100">
        <h2 className="text-xl font-medium text-zinc-900 mb-6">Game History</h2>
        <div className="space-y-4">
          {user_stats.map((game, index) => (
            <div
              key={index}
              className="border-b border-zinc-100 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-zinc-900">
                    Game {index + 1}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">
                    {game.grid_size}x{game.grid_size} Grid • {game.difficulty}{" "}
                    Mode
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-emerald-50 px-3 py-1 rounded-lg text-emerald-700">
                    {game.total_right_click} Right
                  </div>
                  <div className="bg-rose-50 px-3 py-1 rounded-lg text-rose-700">
                    {game.total_wrong_click} Wrong
                  </div>
                  <div className="bg-indigo-50 px-3 py-1 rounded-lg text-indigo-700">
                    {game.time_taken}s
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Performance */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { game: fastestGame, title: "Fastest Game", color: "bg-emerald-50" },
          { game: slowestGame, title: "Slowest Game", color: "bg-amber-50" },
        ].map((item, index) => (
          <div key={index} className={`${item.color} rounded-xl p-6`}>
            <h2 className="text-lg font-medium mb-4">{item.title}</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-zinc-600">Time</span>
                <span className="font-medium">{item.game.time_taken}s</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-600">Grid Size</span>
                <span className="font-medium">
                  {item.game.grid_size}x{item.game.grid_size}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-600">Difficulty</span>
                <span className="font-medium">{item.game.difficulty}</span>
              </li>
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
