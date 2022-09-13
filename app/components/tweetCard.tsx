import { PublicKey } from "@solana/web3.js";
import Link from "next/link";

const TweetCard = (props: any) => {

    const tweet = props.tweet;
    const tweetPbKey = tweet.publicKey.toBase58();
    const author: PublicKey = tweet.account.author;
    const timestamp = tweet.account.timestamp;
    const topic = tweet.account.topic;
    const content = tweet.account.content;

    const href = `https://explorer.solana.com/address/${tweetPbKey}?cluster=devnet`;
    

    return (
        <>
        <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{topic || "Topic missing"}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">{content}</p>
    <Link href={href}><a target="_blank" className="card-link">See on Explorer</a></Link>
  </div>
</div>
        </>
    )
}

export default TweetCard