import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import API from "../services/api";

function RecruiterDashboard() {
  const [placements, setPlacements] = useState([]);
  const [stats, setStats] = useState({
    totalDrives: 0,
    totalApplications: 0,
    shortlistedCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get("/placements", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setPlacements(res.data);
        setStats({
          totalDrives: res.data.length,
          totalApplications: res.data.reduce((sum, p) => sum + (p.appliedStudents?.length || 0), 0),
          shortlistedCount: res.data.reduce((sum, p) => sum + (p.shortlistedStudents?.length || 0), 0)
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container dashboard-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
        <p className="text-muted-foreground">View placement drives and candidate performance (Read-only access).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Total Drives</CardTitle>
            <span className="icon">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDrives}</div>
            <p className="text-xs text-muted-foreground">Available placement drives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Applications</CardTitle>
            <span className="icon">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Total candidate applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Shortlisted</CardTitle>
            <span className="icon">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shortlistedCount}</div>
            <p className="text-xs text-muted-foreground">Shortlisted candidates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="placements" className="space-y-4">
        <TabsList className="tabs-list-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
          <TabsTrigger value="placements">📊 Placements</TabsTrigger>
          <TabsTrigger value="candidates">👨‍💼 Top Candidates</TabsTrigger>
        </TabsList>

        <TabsContent value="placements">
          <Card>
            <CardHeader>
              <CardTitle>Available Placement Drives</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : placements.length === 0 ? (
                <p className="text-muted-foreground">No placement drives available.</p>
              ) : (
                <div className="space-y-3">
                  {placements.map(p => (
                    <div key={p._id} className="p-3 border border-slate-700 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{p.companyName}</h4>
                        <Badge className={p.open ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"}>
                          {p.open ? "ACTIVE" : "CLOSED"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Eligibility: {p.eligibility}</p>
                      <p className="text-sm text-muted-foreground">Salary: {p.salary}</p>
                      <div className="mt-2 flex gap-4 text-xs">
                        <span>Applications: <strong>{p.appliedStudents?.length || 0}</strong></span>
                        <span>Shortlisted: <strong>{p.shortlistedStudents?.length || 0}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <Card>
            <CardHeader>
              <CardTitle>Top Shortlisted Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Detailed candidate view coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <p className="mt-8 text-xs text-muted-foreground text-center">
        ℹ️ Recruiters have read-only access to placement data. Contact admin to manage drives.
      </p>
    </div>
  );
}

export default RecruiterDashboard;
