import { useEffect, useState } from "react";
import { db } from "@/utils/firebaseConfig";
import "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

type Team = {
  name: string;
  description: string;
  members: string[];
};

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);

  // Get user id from auth context
  const userId = "user1";

  useEffect(() => {
    // Fetch teams that the user is in from db
    // Get records where the user id is in the value in the user_id attribute of user_team collection
    const fetchTeams = async () => {
      // TODO: TEST THIS CODE
      try {
        // Reference to the user_team collection
        const userTeamCollectionRef = collection(db, "user_team");
        // Query user_team collection where user_id contains the current user ID
        const userTeamQuery = query(
          userTeamCollectionRef,
          where("user_id", "array-contains", userId)
        );
        const userTeamSnapshot = await getDocs(userTeamQuery);

        // Extract team IDs from the user_team documents
        const teamIds = userTeamSnapshot.docs.map((doc) => doc.id);

        // Fetch teams details using the team IDs
        const teamPromises = teamIds.map(async (teamId) => {
          const teamDoc = await getDoc(doc(db, "teams", teamId));
          return teamDoc.exists() ? (teamDoc.data() as Team) : null;
        });

        const teamsData = await Promise.all(teamPromises);
        setTeams(teamsData.filter((team) => team !== null) as Team[]);
      } catch (error) {
        console.error("Error fetching teams: ", error);
      }
    };
  }, []);

  return (
    <main>
      <div className="container p-5">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Example team</h5>
                  <p className="card-text">Example team description!</p>

                  <button className="btn btn-primary my-1">@ User 1</button>
                  <br />
                  <button className="btn btn-primary my-1">@ User 2</button>
                  <br />
                  <button className="btn btn-primary my-1">@ User 3</button>
                  <br />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Example team</h5>
                  <p className="card-text">Example team description!</p>

                  <button className="btn btn-primary my-1">@ User 1</button>
                  <br />
                  <button className="btn btn-primary my-1">@ User 2</button>
                  <br />
                  <button className="btn btn-primary my-1">@ User 3</button>
                  <br />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Example team</h5>
                  <p className="card-text">Example team description!</p>

                  <button className="btn btn-primary my-1">@ User 1</button>
                  <br />
                  <button className="btn btn-primary my-1">@ User 2</button>
                  <br />
                  <button className="btn btn-primary my-1">@ User 3</button>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
