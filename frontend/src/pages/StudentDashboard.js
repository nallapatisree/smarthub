import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import CodingPracticeTab from "../components/CodingPracticeTab";
import QuizEngineTab from "../components/QuizEngineTab";
import AlgorithmVisualizationTab from "../components/AlgorithmVisualizationTab";
import PlacementDrivesTab from "../components/PlacementDrivesTab";

function StudentDashboard() {
  const [stats] = useState({
    problemsSolved: 12,
    quizzesTaken: 8,
    placementDrives: 3,
    progress: 65,
  });

  return (
    <div className="container dashboard-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Continue your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Problems Solved</CardTitle>
            <span className="icon">💻</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.problemsSolved}</div>
            <p className="text-xs text-muted-foreground">Coding challenges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Quizzes Taken</CardTitle>
            <span className="icon">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quizzesTaken}</div>
            <p className="text-xs text-muted-foreground">Assessments completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Placement Drives</CardTitle>
            <span className="icon">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.placementDrives}</div>
            <p className="text-xs text-muted-foreground">Active opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Progress</CardTitle>
            <span className="icon">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.progress}%</div>
            <Progress value={stats.progress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="coding" className="space-y-4">
        <TabsList className="tabs-list-grid">
          <TabsTrigger value="coding">💻 Coding Practice</TabsTrigger>
          <TabsTrigger value="quizzes">📝 Quizzes</TabsTrigger>
          <TabsTrigger value="algorithms">🔄 Algorithms</TabsTrigger>
          <TabsTrigger value="placements">🏢 Placements</TabsTrigger>
        </TabsList>

        <TabsContent value="coding">
          <CodingPracticeTab />
        </TabsContent>

        <TabsContent value="quizzes">
          <QuizEngineTab />
        </TabsContent>

        <TabsContent value="algorithms">
          <AlgorithmVisualizationTab />
        </TabsContent>

        <TabsContent value="placements">
          <PlacementDrivesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StudentDashboard;
