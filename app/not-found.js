import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center p-6">
      {/* Pixelated 404 Text */}
      <h1 className="text-6xl pixel-text mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Pixelated Character Image (Optional) */}
      <div className="w-32 h-32 bg-gray-800 flex items-center justify-center pixel-border mb-6">
        <span className="text-4xl">🤖</span>
      </div>

      {/* Go Back Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition pixel-border"
      >
        Go Home
      </Link>
    </div>
  );
}
