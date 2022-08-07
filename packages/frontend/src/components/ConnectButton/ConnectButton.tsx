import { ConnectKitButton } from "connectkit";
import { Button } from "../ui/Button";
import { useEnsName, useAccount } from "wagmi";
import { truncateAddress } from "../../utils";

export function ConnectButton({ className }: { className?: any }) {
  const { address } = useAccount();

  const { data, isError, isLoading } = useEnsName({
    address,
  });
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <Button css={className} variant="bravo" onClick={show}>
            {isConnected
              ? data ?? truncateAddress(address as string)
              : "Connect wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
