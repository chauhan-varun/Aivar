import { Button } from "@workspace/ui/components/button";
import { add } from "@workspace/math/add";
import { Input } from "@workspace/ui/components/input";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <Input></Input>
      <div className="flex flex-col items-center justify-center gap-4"></div>
    </div>
  );
}
