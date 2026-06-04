/** Extract a short plain-text preview from a Tiptap JSON doc. */
export function extractNotePreview(content: unknown, maxLength = 80): string {
	if (!content || typeof content !== "object") return "";
	const doc = content as { content?: unknown[] };
	const texts: string[] = [];

	function walk(nodes: unknown[] | undefined) {
		if (!nodes) return;
		for (const node of nodes) {
			if (!node || typeof node !== "object") continue;
			const n = node as { type?: string; text?: string; content?: unknown[] };
			if (n.type === "text" && typeof n.text === "string") {
				texts.push(n.text);
			}
			walk(n.content);
		}
	}

	walk(doc.content);
	const full = texts.join(" ").trim();
	return full.length > maxLength ? `${full.slice(0, maxLength)}...` : full;
}

/** Format a timestamp (ms) as a short readable string. */
export function formatNoteDate(ms: number): string {
	const d = new Date(ms);
	return d.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
}
