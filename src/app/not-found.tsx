import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="foundation" data-od-id="not-found" id="main-content">
      <p className="eyebrow">404</p>
      <h1>This page is not in the collection.</h1>
      <p className="lede">The address may have changed, or the entry may not be published.</p>
      <Link className="text-link" data-testid="not-found-home-link" href="/">
        Return home
      </Link>
    </main>
  );
}
