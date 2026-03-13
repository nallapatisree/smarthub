import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function QuizEngineTab() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes([
      { id: 1, title: "Data Structures Basics", score: 85, total: 100 },
      { id: 2, title: "Algorithms I", score: 72, total: 100 },
      { id: 3, title: "DSA Advanced", score: null, total: 100 },
    ]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {quizzes.map((q) => (
            <div key={q.id} className="flex items-center justify-between p-2 border border-slate-700 rounded">
              <span>{q.title}</span>
              <span className="text-xs text-muted-foreground">
                {q.score ? `${q.score}/${q.total}` : "Not attempted"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
