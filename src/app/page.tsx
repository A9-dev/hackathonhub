import "bootstrap/dist/css/bootstrap.min.css";
// This is how you import bootstrap ^

export default function Home() {
  return (
    <main>
      <button type="button" className="btn btn-info">
        Info
      </button>
      <button type="button" class="btn btn-primary">
        Primary
      </button>
    </main>
  );
}
