import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance } from "wagmi";
import { useState, useEffect } from "react";

export default function InstructionsComponent() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>
          <span>Andrew Dapp</span>
        </h1>
      </header>

      <div className={styles.buttons_container}>
        <PageBody></PageBody>
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
}

function PageBody() {
  return (
    <>
      <WalletInfo></WalletInfo>
      <Profile></Profile>
    </>
  );
}

function WalletInfo() {
  const { data: signer, isError, isLoading } = useSigner();
  const { chain, chains } = useNetwork();
  if (signer)
    return (
      <>
        <p>Your account address: {signer._address}</p>
        <p>Connected to {chain.name} network</p>
        <button
          onClick={() => {
            signMessage(signer, "Hi there");
          }}
        >
          Sign
        </button>
        <WalletBalance></WalletBalance>
      </>
    );
  if (isLoading)
    return (
      <>
        <p>Wait a while! Wallet is connecting...</p>
      </>
    );
  return (
    <>
      <p>Kindly connect a wallet</p>
    </>
  );
}

function WalletBalance() {
  const { data: signer } = useSigner();
  const { data, isError, isLoading } = useBalance({
    address: signer._address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
}

function signMessage(signer, message) {
  signer.signMessage(message).then(
    (response) => console.log(response),
    (error) => console.error(error)
  );
}

function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://random-data-api.com/api/v2/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.username}</h1>
      <p>{data.email}</p>
    </div>
  );
}
