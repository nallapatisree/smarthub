import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function CodingPracticeTab() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Mock data
    setProblems([
      { id: 1, title: "Two Sum", difficulty: "Easy", status: "completed" },
      { id: 2, title: "Longest Substring", difficulty: "Medium", status: "in-progress" },
      { id: 3, title: "Median of Two Arrays", difficulty: "Hard", status: "not-started" },
    ]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding Practice Problems</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {problems.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-2 border border-slate-700 rounded">
              <span>{p.title}</span>
              <span className={`text-xs px-2 py-1 rounded ${p.difficulty === "Easy" ? "bg-green-500/20 text-green-300" : p.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-300" : "bg-red-500/20 text-red-300"}`}>
                {p.difficulty}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
