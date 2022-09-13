import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Link from "next/link"

const NavBar = () => {
    return <>
    <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse text-light" id="navbarTogglerDemo01">
        <Link href="/">
        <a className="navbar-brand" href="#">Sol twitter</a>
        </Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
        <li className="nav-item">
            <Link href="myTweets">
            <a className="nav-link active text-light" aria-current="page" href="#">MyTweet</a>
            </Link>
           </li>
      </ul>
      <WalletMultiButton/>
    </div>
  </div>
</nav>
    </>
}
export default NavBar