import { actions } from "astro:actions";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InputText } from "@/components/ui/InputText";

export function Home() {
  const [name, setName] = useState("");

  function submit() {
    const parsedName = name.trim();

    if (parsedName) {
      console.log(name);
      actions.user.create({ name });
      setName("");
    }
  }

  return (
    <Card className="gap-4">
      <InputText onChange={setName} value={name} />
      <Button onClick={submit}>Salvar</Button>
    </Card>
  );
}
