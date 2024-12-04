import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import AppBar from "@/components/admin/AppBar";

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar />

        <main className="ml-64 flex-1 p-6">
          <h1 className="text-2xl text-black">Admin Dashboard</h1>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
