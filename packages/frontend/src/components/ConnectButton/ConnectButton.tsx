import { ConnectKitButton } from "connectkit";
import { Button } from "../ui/Button";
import { useEnsName, useAccount } from "wagmi";

export function ConnectButton() {
  const { address } = useAccount();

  const { data, isError, isLoading } = useEnsName({
    address,
  });
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <Button onClick={show}>
            {isConnected ? data ?? address : "Connect wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
