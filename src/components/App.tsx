import React, { useState, useEffect } from "react";

// 단어 데이터 타입 정의
interface Word {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [word, setWord] = useState<string>(""); // 입력 값
  const [words, setWords] = useState<Word[]>([]); // 단어 목록

  // 저장된 단어 불러오기
  useEffect(() => {
    chrome.storage.local.get(["words"], (data) => {
      setWords(data.words || []);
    });
  }, []);

  // 단어 추가
  const addWord = () => {
    if (!word.trim()) return;

    const newWord: Word = { id: Date.now(), text: word };
    const updatedWords = [...words, newWord];

    setWords(updatedWords);
    chrome.storage.local.set({ words: updatedWords }, () => setWord(""));
  };

  // 모든 단어 삭제
  const clearWords = () => {
    chrome.storage.local.set({ words: [] }, () => setWords([]));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Dictionary History</h1>
        <div className="mb-4">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={addWord}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
          <button
            onClick={clearWords}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Clear
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Saved Words</h2>
          <ul className="space-y-2">
            {words.map((word) => (
              <li
                key={word.id}
                className="px-4 py-2 bg-gray-100 rounded-md border border-gray-200"
              >
                {word.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
