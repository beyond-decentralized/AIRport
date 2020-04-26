export async function authenticate(): Promise<void> {
	const response = await fetch('http://localhost:31808/authenticate')
}