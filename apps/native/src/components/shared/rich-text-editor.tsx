import {
	type EditorBridge,
	RichText,
	TenTapStartKit,
	Toolbar,
	useEditorBridge,
	useEditorContent,
} from "@10play/tentap-editor";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

interface RichTextEditorProps {
	initialContent?: string | object;
	onChange?: (jsonContent: unknown) => void;
	placeholder?: string;
}

// Utility to parse initial content if it's a JSON string or return it directly
const getParsedInitialContent = (content?: string | object) => {
	if (!content) return undefined;
	if (typeof content === "object") return content;
	try {
		return JSON.parse(content);
	} catch {
		return content; // Return as HTML string or plain text
	}
};

// Isolated component to listen to content updates and trigger onChange to avoid re-rendering the whole editor
const ContentListener = ({
	editor,
	onChange,
}: {
	editor: EditorBridge;
	onChange?: (jsonContent: unknown) => void;
}) => {
	const content = useEditorContent(editor, { type: "json" });

	useEffect(() => {
		if (onChange && content) {
			onChange(content);
		}
	}, [content, onChange]);

	return null;
};

export const RichTextEditor = ({
	initialContent,
	onChange,
	placeholder = "Start writing your thoughts here...",
}: RichTextEditorProps) => {
	const parsedContent = getParsedInitialContent(initialContent);

	const editor = useEditorBridge({
		initialContent: parsedContent,
		bridgeExtensions: TenTapStartKit,
		autofocus: false,
		avoidIosKeyboard: true,
		theme: {
			toolbar: {
				toolbarBody: {
					backgroundColor: "#ffffff",
					borderTopColor: "#e5e5e5",
					borderBottomColor: "#e5e5e5",
					paddingVertical: 6,
				},
				toolbarButton: {
					backgroundColor: "transparent",
				},
				iconWrapperActive: {
					backgroundColor: "#ededed",
					borderRadius: 8,
				},
			},
			webview: {
				backgroundColor: "#f7f7f5",
			},
		},
	});

	// Inject premium typography and styling directly into the ProseMirror editor
	useEffect(() => {
		editor.injectCSS(OVERWRITE_DEFAULT_STYLE(placeholder));
	}, [editor, placeholder]);

	return (
		<View style={styles.container}>
			<View style={styles.editorContainer}>
				<RichText editor={editor} />
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				<Toolbar editor={editor} />
			</KeyboardAvoidingView>

			<ContentListener editor={editor} onChange={onChange} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f7f7f5",
	},
	editorContainer: {
		flex: 1,
	},
});

const OVERWRITE_DEFAULT_STYLE = (placeholder: string) => `
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 18px;
        line-height: 1.6;
        color: #151515;
        background-color: #f7f7f5;
        margin: 0;
        padding: 8px 12px;
      }
      .ProseMirror {
        outline: none;
        min-height: 350px;
      }
      .ProseMirror p {
        margin-top: 0;
        margin-bottom: 16px;
      }
      .ProseMirror p.is-empty::before {
        content: "${placeholder}";
        color: #a5a5a5;
        float: left;
        height: 0;
        pointer-events: none;
      }
      /* Checklist & lists premium styling */
      ul[data-type="taskList"] {
        list-style: none;
        padding: 0;
        margin: 0 0 16px 0;
      }
      ul[data-type="taskList"] li {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
      }
      ul[data-type="taskList"] label {
        margin-right: 12px;
        user-select: none;
        display: flex;
        align-items: center;
        height: 24px;
      }
      ul[data-type="taskList"] input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #000000;
        cursor: pointer;
      }
      ul[data-type="taskList"] div {
        flex: 1;
      }
    `;
