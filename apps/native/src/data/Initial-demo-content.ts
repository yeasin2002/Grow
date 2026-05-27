// Initial demo content structured in Tiptap JSON format
export const INITIAL_DEMO_CONTENT = {
	type: "doc",
	content: [
		{
			type: "paragraph",
			content: [
				{
					type: "text",
					text: "I have to take all of these things from the market. Also the money needs to be given to my mom.",
				},
			],
		},
		{
			type: "taskList",
			content: [
				{
					type: "taskItem",
					attrs: { checked: false },
					content: [
						{
							type: "paragraph",
							content: [{ type: "text", text: "Onion - 1kg" }],
						},
					],
				},
				{
					type: "taskItem",
					attrs: { checked: true },
					content: [
						{
							type: "paragraph",
							content: [{ type: "text", text: "Carrot - 2 pcs" }],
						},
					],
				},
				{
					type: "taskItem",
					attrs: { checked: false },
					content: [
						{
							type: "paragraph",
							content: [{ type: "text", text: "Milk - 1L" }],
						},
					],
				},
				{
					type: "taskItem",
					attrs: { checked: true },
					content: [
						{
							type: "paragraph",
							content: [{ type: "text", text: "Bread - 1 packet" }],
						},
					],
				},
			],
		},
	],
};
