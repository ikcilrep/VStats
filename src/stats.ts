import { TextDocument } from "vscode";

interface Statistics {
    lines: number;
    chars: number;
    numberOfFiles: number;
    createdAt: number;
    languageId: string;
}

function statisticsFromDocuments(documents: readonly TextDocument[]): Statistics {
    const texts = documents.map(document => document.getText());
    return {
        "lines": countLines(),
        "chars": countChars(),
        "numberOfFiles": documents.length,
        "createdAt": Date.now(),
        "languageId": documents[0].languageId
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
