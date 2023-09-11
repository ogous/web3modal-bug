import Link from "next/link"

export default function Page() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Link href={'/second'}>
                Go to home page
            </Link>
        </main>
    )
}