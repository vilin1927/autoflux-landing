"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, ExternalLink, FileText, Eye } from "lucide-react";

// Password: c2SrF62uib
const ADMIN_PASSWORD = "c2SrF62uib";

const proposals = [
  {
    id: "etoll",
    name: "eToll AI Assistant",
    client: "eToll Zambia",
    price: "$4,500",
    status: "Active",
    proposalUrl: "/proposals/etoll",
    demoUrl: "/proposals/etoll/demo",
  },
  {
    id: "orgonic-art-raphael",
    name: "EU Regulation Discovery Tool",
    client: "Orgonic-Art (Raphael)",
    price: "$540",
    status: "Active",
    proposalUrl: "/proposals/orgonic-art-raphael",
    demoUrl: "/proposals/orgonic-art-raphael/demo",
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-900 rounded-xl mx-auto mb-6">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-center text-gray-900 mb-6">
            Admin Access
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">
                    {proposal.name}
                  </h2>
                  <p className="text-gray-500 text-sm">{proposal.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{proposal.price}</p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    {proposal.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={proposal.proposalUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Proposal
                </Link>
                <Link
                  href={proposal.demoUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Demo
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          {proposals.length} proposals
        </p>
      </div>
    </div>
  );
}
