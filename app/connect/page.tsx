import { CONNECT_METADATA, CONNECT_VIEWPORT, ConnectLanding } from "./connect-landing";

export const viewport = CONNECT_VIEWPORT;
export const metadata = CONNECT_METADATA;

export default function ConnectPage() {
  return <ConnectLanding />;
}
