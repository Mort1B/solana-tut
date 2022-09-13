import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolT } from "../target/types/sol_t";

describe("sol-t", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolT as Program<SolT>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
