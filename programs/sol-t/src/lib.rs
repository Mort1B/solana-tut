use anchor_lang::prelude::*;

declare_id!("DZyZ4HaJQ4kHXoPVFJARnC1gV7NzbujtPJRBu9Hcei3d");

#[program]
pub mod sol_t {
    use super::*;

    pub fn send_tweet(
        send_tweet_ctx: Context<SendTweet>,
        topic: String,
        tweet_content: String,
    ) -> Result<()> {
        if topic.chars().count() > 50 {
            return err!(TweetError::TopicTooLong);
        }
        if tweet_content.chars().count() > 280 {
            return err!(TweetError::ContentTooLong);
        }

        let my_tweet = &mut send_tweet_ctx.accounts.my_tweet;
        let sender_of_tweet = &send_tweet_ctx.accounts.sender_of_tweet;
        let clock = Clock::get().unwrap();

        my_tweet.author = *sender_of_tweet.key;
        my_tweet.timestamp = clock.unix_timestamp;
        my_tweet.topic = topic;
        my_tweet.content = tweet_content;

        Ok(())
    }
}

#[error_code]
pub enum TweetError {
    #[msg("Tweet topic should be less than 50 chars")]
    TopicTooLong,
    #[msg("Theet content should be ledd than 280 chars")]
    ContentTooLong,
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer=sender_of_tweet, space=Tweet::LEN)]
    pub my_tweet: Account<'info, Tweet>,

    #[account(mut)]
    pub sender_of_tweet: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Size of the string
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH //author
        + TIMESTAMP_LENGTH //timestamp
        + STRING_LENGTH_PREFIX
        + MAX_CONTENT_LENGTH //content
        + STRING_LENGTH_PREFIX
        + MAX_TOPIC_LENGTH; //topic
}
