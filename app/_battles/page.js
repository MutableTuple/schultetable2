import React from "react";
import BattlePage from "../_components/BattlePage";
import { getSession } from "../_lib/auth";

export default async function page() {
  const session = await getSession();

  return (
    <div>
      start by joingin a battle
      <BattlePage />
    </div>
  );
}
