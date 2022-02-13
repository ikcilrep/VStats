import { TextDocument } from "vscode";

interface Statistics {
  lines: number;
  chars: number;
  numberOfFiles: number;
  createdAt: number;
}

function statisticsFromDocuments(
  documents: readonly TextDocument[]
): Statistics {
  const texts = documents.map((document) => document.getText());
  return {
    lines: countLines(),
    chars: countChars(),
    numberOfFiles: documents.length,
    createdAt: Date.now(),
  };

  function countLines(): number {
    return texts
      .map((text) => text.split(/\r\n|\r|\n/).length)
      .reduce((result, number_of_lines) => result + number_of_lines);
  }

  function countChars(): number {
    return texts
      .map((text) => text.length)
      .reduce((result, number_of_chars) => result + number_of_chars);
  }
}

export { Statistics, statisticsFromDocuments };
