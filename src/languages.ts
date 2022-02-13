import { TextDocument } from "vscode";

function groupByLanguage(documents: readonly TextDocument[]): Map<String, Array<TextDocument>> {
    const groupedDocuments = new Map<String, TextDocument[]>();
    documents.forEach(document => {
        if (!groupedDocuments.has(document.languageId))
            groupedDocuments.set(document.languageId, []);
        groupedDocuments.get(document.languageId)?.push(document);
    });
    return groupedDocuments;
}

export { groupByLanguage };