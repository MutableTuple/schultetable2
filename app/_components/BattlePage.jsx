"use client";
import { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase"; // adjust path if needed

export default function BattlesPage({ session }) {
  const user_id = session?.user?.id;
  const [battleId, setBattleId] = useState(null);
  const [status, setStatus] = useState("Looking for opponent...");

  useEffect(() => {
    if (!user_id) return;

    const joinQueue = async () => {
      const { data: existing } = await supabase
        .from("WaitingRoom")
        .select("*")
        .eq("user_id", user_id)
        .maybeSingle();

      if (!existing) {
        await supabase.from("WaitingRoom").insert([{ user_id }]);
      }

      matchOrListen();
    };

    joinQueue();

    return () => {
      supabase.from("WaitingRoom").delete().eq("user_id", user_id).then();
    };
  }, [user_id]);

  const matchOrListen = async () => {
    const { data: waitingPlayers } = await supabase
      .from("WaitingRoom")
      .select("*")
      .neq("user_id", user_id)
      .order("inserted_at", { ascending: true })
      .limit(1);

    if (waitingPlayers?.length > 0) {
      const opponent = waitingPlayers[0];

      const grid = generateGameGrid();

      const { data: battle } = await supabase
        .from("Battles")
        .insert([
          {
            player1_id: user_id,
            player2_id: opponent.user_id,
            shared_numbers: grid,
            start_time: new Date(Date.now() + 3000),
          },
        ])
        .select()
        .single();

      await supabase.from("WaitingRoom").delete().eq("user_id", user_id);
      await supabase
        .from("WaitingRoom")
        .delete()
        .eq("user_id", opponent.user_id);

      setStatus("Opponent found! Starting game...");
      setBattleId(battle.id);
    } else {
      listenForBattle();
    }
  };

  const listenForBattle = () => {
    setStatus("Waiting for opponent...");

    const channel = supabase
      .channel("battles-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Battles",
        },
        (payload) => {
          const battle = payload.new;
          if (battle.player1_id === user_id || battle.player2_id === user_id) {
            setBattleId(battle.id);
            setStatus("Matched! Starting game...");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const generateGameGrid = () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-black text-white text-center">
      <h1 className="text-3xl font-bold mb-4">🔍 Matchmaking</h1>
      <p className="text-lg">{status}</p>

      {battleId && (
        <div className="mt-6">
          <p className="text-green-400 text-xl">Battle ID: {battleId}</p>
          <p className="mt-2">Game starting soon...</p>
        </div>
      )}
    </div>
  );
}
