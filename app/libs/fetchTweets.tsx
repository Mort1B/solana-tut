import { Program } from "@project-serum/anchor";

export const fetchTweets = async (program: Program, filters=[]) => {
    const tweetAccounts = await program.account.tweet.all(filters);

    return tweetAccounts;
};

export const authorFilter = (authorBase58PK:String) => ({
    
        memcmp: {
            offset: 8,
            bytes: authorBase58PK,
        
    }
} )