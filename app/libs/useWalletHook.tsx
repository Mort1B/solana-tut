import { Program, AnchorProvider } from "@project-serum/anchor";
import {
    useConnection,
    useWallet as useAdapterWallet,
    useAnchorWallet,
    WalletContextState,
    AnchorWallet,
} from "@solana/wallet-adapter-react";

import {Connection, PublicKey } from "@solana/web3.js";

import idl from "../../target/idl/sol_t.json";

const programId = new PublicKey(idl.metadata.address);

const useWalletHook = ():{
    connection: Connection;
    adapterWalletObj: WalletContextState;
    anchorWalletObj: AnchorWallet | undefined;
    provider: AnchorProvider;
    program: Program;
} => {

    const {connection } = useConnection();
    const adapterWalletObj = useAdapterWallet();
    const anchorWalletObj = useAnchorWallet();

    const provider = new AnchorProvider(connection, adapterWalletObj, {});
    const program = new Program(idl, programId, provider);

    return {
        connection,
        adapterWalletObj,
        anchorWalletObj,
        provider,
        program
    }

}

export default useWalletHook;