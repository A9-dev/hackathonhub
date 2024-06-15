"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("Prompt!");

  return (
    <main>
      <div className="container-fluid text-center p-5 bg-secondary-subtle">
        <h1 className="display-1">{prompt}</h1>
        <p>01:13:21</p>
      </div>
      <div
        className="container border rounded-4 rounded-top-0 bg-primary-subtle"
        style={{ padding: "50px 20px 100px 20px" }}
      >
        <div className="text-center">
          <h1>Welcome to HackathonHub!</h1>
          <h4>We organise online hackathons!</h4>
        </div>
        <br />
        <hr className="solid mx-auto" style={{ width: "90%" }} />
        <div className="m-auto" style={{ width: "85%" }}>
          <h3>1. What is a hackathon?</h3>

          <figure className="mx-3">
            <p>
              A hackathon is an event where participants collaborate intensively
              to develop software or hardware projects within a short timeframe,
              often focused on specific themes or challenges, with opportunities
              for learning, networking, and winning prizes.
            </p>
            <figcaption className="blockquote-footer">GPT 3.5</figcaption>
          </figure>

          <h3>2. How do I participate?</h3>
          <p className="mx-3">
            In your team, you will build a project that fits the theme of the
            hackathon. Before the time is up, you can submit your project by
            providing a link to the GitHub repo.{" "}
            <b>Make sure to include a README.md in the repo! </b>
          </p>
          <h3>3. What are the rules?</h3>

          <ul>
            <li>Teams can consist of 1-5 members.</li>
            <li>
              All code and assets must be created during the hackathon period.
              Pre-existing code is not allowed (other than public
              libraries/frameworks).
            </li>
            <li>
              Projects must be submitted before the deadline to be eligible for
              judging.
            </li>
            <li>
              Teams must adhere to the theme or challenge provided by the
              organizers.
            </li>
            <li>
              Teams retain ownership of their projects, but organizers reserve
              the right to showcase the projects for promotional purposes.
            </li>
            <li>
              Judging criteria will be based on creativity, functionality,
              design, and adherence to the theme.
            </li>
          </ul>
          <h3>4. What should I build?</h3>
          <p className="mx-3">
            You can build anything you want, as long as it fits the theme of the
            hackathon. This could be a web app, mobile app, game, AI model,
            hardware project, or anything else you can imagine. Be creative and
            have fun!
          </p>
          <h3>5. How are they scored?</h3>
          <p className="mx-3">
            Pairs of projects will be given to users who will choose the winner
            based on creativity, functionality, design, and adherence to the
            theme. Through intelligent and complex algorithms, the ranking will
            be determined and points will be distributed.
          </p>
          <h3>6. What do I get out of it?</h3>
          <p className="mx-3">
            You will earn experience points and badges that can customize your
            appearance on the website and be shown off on your profile. Also,
            companies that sponsor a hackathon will be able to see your work and
            may reach out to you for job opportunities.
          </p>
          <h3>7. What should be in README.md?</h3>
          <ul>
            <li>Thing 1</li>
            <li>Thing 2</li>
            <li>Thing 3</li>
            <li>Thing 4</li>
            <li>Thing 5</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
