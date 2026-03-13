import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function PlacementDrivesTab() {
  const drives = [
    { id: 1, company: "Google", status: "Applied", date: "Feb 15" },
    { id: 2, company: "Microsoft", status: "Interview", date: "Feb 20" },
    { id: 3, company: "Amazon", status: "Open", date: "Feb 28" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Placement Drives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {drives.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-2 border border-slate-700 rounded">
              <span>{d.company}</span>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-1 rounded ${d.status === "Open" ? "bg-blue-500/20 text-blue-300" : d.status === "Applied" ? "bg-yellow-500/20 text-yellow-300" : "bg-purple-500/20 text-purple-300"}`}>
                  {d.status}
                </span>
                <span className="text-muted-foreground">{d.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
