"use client";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

const Page = () => {
  const { isConnected, isConnecting, isSpeaking, startCall, endCall, transcript } = useVapi();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button onClick={() => startCall()} disabled={isConnecting || isConnected}>
        {isConnecting ? "Connecting..." : "Start Call"}
      </Button>
  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button onClick={() => startCall()}>Start Call</Button>
      {isConnected && (
        <Button
          variant="destructive"
          onClick={() => endCall()}
          className="ml-4"
        >
          End Call
        </Button>
      )}
      {isSpeaking && <p className="ml-4">VAPI is speaking...</p>}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Transcript:</h2>
        <div className="border p-4 h-64 overflow-y-auto bg-white">
          {transcript.map((entry, index) => (
            <p key={index} className="mb-2">
              <strong>{entry.role === "user" ? "User" : "Assistant"}:</strong>{" "}
              {entry.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
