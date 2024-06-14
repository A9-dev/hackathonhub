"use client";
import { useEffect, useState } from 'react';
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "testCollection"));
      const data = querySnapshot.docs.map(doc => doc.data().message);
      setMessage(data[0]); // Set the message from the first document
    };

    fetchData();
  }, []);

  return (
    <main>
      <button type="button" className="btn btn-info">
        Info
      </button>
      <button type="button" className="btn btn-primary">
        Primary
      </button>
      <p>{message}</p>
    </main>
  );
}
