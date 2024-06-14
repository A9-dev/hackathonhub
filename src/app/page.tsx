"use client";
import { useEffect, useState } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("Prompt!");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      const data = querySnapshot.docs.map((doc) => doc.data().message);
      setMessage(data[0]); // Set the message from the first document
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="container-fluid text-center p-5 width-100% bg-secondary-subtle">
        <h1 className="display-1">{prompt}</h1>
        <p>01:13:21</p>
      </div>
      <div className="container border rounded-4 rounded-top-0 bg-primary-subtle p-5">
        <div className="text-center">
          <h1>Welcome to HackathonHub!</h1>
          <h2>This is a platform for hosting and managing hackathons.</h2>
        </div>
        <br />
        <div className="m-auto" style={{ width: "70%" }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Pretium fusce id velit ut tortor. Lacinia
            at quis risus sed vulputate odio ut enim. Suspendisse faucibus interdum posuere lorem
            ipsum dolor sit amet. Imperdiet proin fermentum leo vel orci porta. Pharetra massa massa
            ultricies mi quis hendrerit dolor magna. Laoreet id donec ultrices tincidunt.
          </p>
          <b>
            <ol style={{ listStylePosition: "inside" }}>
              <li>Thing 1</li>
              <li>Thing 2</li>
              <li>Thing 3</li>
              <li>Thing 4</li>
              <li>Thing 5</li>
            </ol>
          </b>
          <p>
            In hendrerit gravida rutrum quisque non tellus. Facilisi nullam vehicula ipsum a arcu
            cursus vitae. Sit amet facilisis magna etiam. Pellentesque dignissim enim sit amet
            venenatis urna cursus. Nisi porta lorem mollis aliquam ut porttitor leo a diam. In hac
            habitasse platea dictumst quisque sagittis purus sit amet. Pellentesque nec nam aliquam
            sem et tortor consequat id porta. Neque convallis a cras semper. Pretium aenean pharetra
            magna ac placerat. A iaculis at erat pellentesque adipiscing commodo elit at. Iaculis at
            erat pellentesque adipiscing commodo elit at imperdiet. Lacus sed turpis tincidunt id
            aliquet risus feugiat. At risus viverra adipiscing at in tellus integer. Scelerisque
            mauris pellentesque pulvinar pellentesque habitant morbi. Quisque id diam vel quam
            elementum. Ornare arcu dui vivamus arcu felis bibendum ut. Ultrices eros in cursus
            turpis massa tincidunt dui. Tempus urna et pharetra pharetra massa massa. Lobortis
            scelerisque fermentum dui faucibus in ornare quam viverra orci.
          </p>
        </div>
      </div>
    </main>
  );
}
