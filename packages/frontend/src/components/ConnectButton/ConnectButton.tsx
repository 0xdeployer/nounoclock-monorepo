import { ConnectKitButton } from "connectkit";
import { Button } from "../ui/Button";
import { useEnsName, useAccount } from "wagmi";
import { truncateAddress } from "../../utils";

export function ConnectButton() {
  const { address } = useAccount();

  const { data, isError, isLoading } = useEnsName({
    address,
  });
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <Button variant="bravo" onClick={show}>
            {isConnected
              ? data ?? truncateAddress(address as string)
              : "Connect wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
