import { TextDocument } from "vscode";

interface Statistics {
    linesOfCode: number;
    characterCount: number;
    fileCount: number;
    createdAt: number;
    language: string;
    projectId: string;
}

function statisticsFromDocuments(documents: readonly TextDocument[], projectId: string): Statistics {
    const texts = documents.map(document => document.getText());
    return {
        "linesOfCode": countLines(),
        "characterCount": countChars(),
        "fileCount": documents.length,
        "createdAt": Date.now(),
        "language": documents[0].languageId,
        "projectId": projectId
    };

    function countLines(): number {
        return texts.map(text => text.split(/\r\n|\r|\n/).length)
            .reduce((result, number_of_lines) => result + number_of_lines);
    }

    function countChars(): number {
        return texts.map(text => text.length)
            .reduce((result, number_of_chars) => result + number_of_chars);
    }
}

export { Statistics, statisticsFromDocuments };
