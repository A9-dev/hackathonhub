"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("Prompt!");

  return (
    <main>
      <div className="container-fluid text-center p-5 width-100% bg-secondary-subtle">
        <h1 className="display-1">{prompt}</h1>
        <p>01:13:21</p>
      </div>
      <div className="container text-center  border rounded-4 rounded-top-0 bg-primary-subtle p-5">
        <h1>Welcome to HackathonHub!</h1>
        <h2>This is a platform for hosting and managing hackathons.</h2>
        <br />
        <p className="text-center m-auto" style={{ width: "50%" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores repellat fuga fugiat
          sequi expedita libero doloremque quos quod pariatur ipsa soluta quis ipsam, illo nemo
          quasi nulla. Repellat, alias dolores!
        </p>
      </div>
    </main>
  );
}
