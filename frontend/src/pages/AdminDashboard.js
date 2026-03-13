import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import API from "../services/api";

function AdminDashboard() {
  const [placements, setPlacements] = useState([]);
  const [stats, setStats] = useState({
    activeDrives: 0,
    totalApplications: 0,
    shortlistedStudents: 0
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
          activeDrives: res.data.filter(p => p.open).length,
          totalApplications: res.data.reduce((sum, p) => sum + (p.appliedStudents?.length || 0), 0),
          shortlistedStudents: res.data.reduce((sum, p) => sum + (p.shortlistedStudents?.length || 0), 0)
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container dashboard-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage placement drives and monitor student applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Active Drives</CardTitle>
            <span className="icon">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDrives}</div>
            <p className="text-xs text-muted-foreground">Ongoing placement drives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Total Applications</CardTitle>
            <span className="icon">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">From all drives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="card-header-row">
            <CardTitle className="card-title-sm">Shortlisted</CardTitle>
            <span className="icon">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shortlistedStudents}</div>
            <p className="text-xs text-muted-foreground">Candidates shortlisted</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="drives" className="space-y-4">
        <TabsList className="tabs-list-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
          <TabsTrigger value="drives">📊 All Drives</TabsTrigger>
          <TabsTrigger value="create">➕ Create Drive</TabsTrigger>
        </TabsList>

        <TabsContent value="drives">
          <Card>
            <CardHeader>
              <CardTitle>Placement Drives</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : placements.length === 0 ? (
                <p className="text-muted-foreground">No placement drives created yet.</p>
              ) : (
                <div className="space-y-3">
                  {placements.map(p => (
                    <div key={p._id} className="p-3 border border-slate-700 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{p.companyName}</h4>
                        <Badge className={p.open ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                          {p.open ? "OPEN" : "CLOSED"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Eligibility: {p.eligibility}</p>
                      <p className="text-sm text-muted-foreground">Location: {p.location}</p>
                      <div className="mt-2 flex gap-4 text-xs">
                        <span>Applied: <strong>{p.appliedStudents?.length || 0}</strong></span>
                        <span>Shortlisted: <strong>{p.shortlistedStudents?.length || 0}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Placement Drive</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-3" onSubmit={(e) => {
                e.preventDefault();
                alert("Create feature coming soon!");
              }}>
                <input type="text" placeholder="Company Name" className="input w-full" required />
                <input type="text" placeholder="Eligibility" className="input w-full" required />
                <input type="text" placeholder="Location" className="input w-full" />
                <input type="text" placeholder="Salary" className="input w-full" />
                <textarea placeholder="Description" className="input w-full" rows={4} />
                <button className="btn" type="submit">Create Drive</button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
