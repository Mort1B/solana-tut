import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolT } from "../target/types/sol_t";
import * as assert from "assert";

describe("sol-t", () => {
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace.SolT as Program<SolT>;
    const anchorProvider = program.provider as anchor.AnchorProvider

    it("Can send a new tweet", async () => {
        const tweetKeyPair = anchor.web3.Keypair.generate();
        
        await program.methods
            .sendTweet("My tweet", "The first tweet")
            .accounts({
                myTweet: tweetKeyPair.publicKey,
                senderOfTweet: anchorProvider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .signers([tweetKeyPair])
            .rpc();

        const tweetAccount = await program.account.tweet.fetch(tweetKeyPair.publicKey);

        assert.equal(tweetAccount.author.toBase58(), anchorProvider.wallet.publicKey);
        assert.equal(tweetAccount.topic, "My tweet");
        assert.equal(tweetAccount.content, "The first tweet");
        assert.ok(tweetAccount.timestamp);

    })

    it("Can send a new tweet without a topic", async () => {
        const tweetKeyPair = anchor.web3.Keypair.generate();
        
        await program.methods
            .sendTweet("", "The first tweet")
            .accounts({
                myTweet: tweetKeyPair.publicKey,
                senderOfTweet: anchorProvider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .signers([tweetKeyPair])
            .rpc();

        const tweetAccount = await program.account.tweet.fetch(tweetKeyPair.publicKey);

        assert.equal(tweetAccount.author.toBase58(), anchorProvider.wallet.publicKey);
        assert.equal(tweetAccount.topic, "");
        assert.equal(tweetAccount.content, "The first tweet");
        assert.ok(tweetAccount.timestamp);

    })

    it("Can send a new tweet from a different user", async () => {
        const otherUser = anchor.web3.Keypair.generate();
        const tweetKeyPair = anchor.web3.Keypair.generate();

        const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);

        const latestBlockHash = await program.provider.connection.getLatestBlockhash();

        await program.provider.connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: signature
        })
        
        await program.methods
            .sendTweet("My tweet", "The first tweet")
            .accounts({
                myTweet: tweetKeyPair.publicKey,
                senderOfTweet: otherUser.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
            })
            .signers([otherUser, tweetKeyPair])
            .rpc();

        const tweetAccount = await program.account.tweet.fetch(tweetKeyPair.publicKey);

        assert.equal(tweetAccount.author.toBase58(), otherUser.publicKey.toBase58());
        assert.equal(tweetAccount.topic, "My tweet");
        assert.equal(tweetAccount.content, "The first tweet");
        assert.ok(tweetAccount.timestamp);

    })

    it("can fetch all tweets", async () => {
        const tweetAccounts = await program.account.tweet.all();

        console.log(tweetAccounts);
    })

    it("can filter tweets by author", async () => {
        const authorPublicKey = anchorProvider.wallet.publicKey;
        const tweetAccount = await program.account.tweet.all([
            {
                memcmp: {
                    offset: 8,
                    bytes: authorPublicKey.toBase58()
                }
            }
        ])

        // assert.equal(tweetAccount.length, 2)
    })
});
