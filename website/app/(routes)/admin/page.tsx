"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Check,
  X,
  Trash2,
  UserPlus,
  Users,
  Package,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Badge } from "@/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Kit, deleteKit, getKits, updateKitStatus } from "@/lib/kits-data";
import { useRouter } from "next/navigation";
import { Wrapper } from "@/components/wrapper";
import { toast } from "sonner";
import {
  addAdminUser,
  getAdminUsers,
  getGitHubUser,
  isCurrentUserAdmin,
  isGitHubConnected,
  removeAdminUser,
} from "@/lib/auth/github.auth";

const statusStyles = {
  pending: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  approved: "bg-primary/10 text-primary border-primary/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Admin() {
  const router = useRouter();

  const [newAdminUsername, setNewAdminUsername] = useState("");
  const isAuthorized = React.useMemo(
    () => isGitHubConnected() && isCurrentUserAdmin(),
    [],
  );
  const [kits, setKits] = useState<Kit[]>(() =>
    isAuthorized ? getKits() : [],
  );
  const [adminUsers, setAdminUsers] = useState<string[]>(() =>
    isAuthorized ? getAdminUsers() : [],
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleApprove = (kitId: string) => {
    const updated = updateKitStatus(kitId, "approved");
    if (updated) {
      setKits(getKits());
      toast.success("Kit Approved", {
        description: `${updated.name} has been approved and will appear in the CLI.`,
      });
    }
  };

  const handleReject = (kitId: string) => {
    const updated = updateKitStatus(kitId, "rejected");
    if (updated) {
      setKits(getKits());
      toast.success("Kit Rejected", {
        description: `${updated.name} has been rejected.`,
      });
    }
  };

  const handleDelete = (kitId: string) => {
    const kit = kits.find((k) => k.id === kitId);
    if (kit && deleteKit(kitId)) {
      setKits(getKits());
      toast.success("Kit Deleted", {
        description: `${kit.name} has been permanently deleted.`,
      });
    }
  };

  const handleAddAdmin = () => {
    if (!newAdminUsername.trim()) return;
    addAdminUser(newAdminUsername.trim());
    setAdminUsers(getAdminUsers());
    setNewAdminUsername("");
    toast.success("Admin Added", {
      description: `${newAdminUsername} can now approve/reject kits.`,
    });
  };

  const handleRemoveAdmin = (username: string) => {
    if (removeAdminUser(username)) {
      setAdminUsers(getAdminUsers());
      toast.success("Admin Removed", {
        description: `${username} is no longer an admin.`,
      });
    } else {
      toast.error("Cannot Remove", {
        description: "The default admin cannot be removed.",
      });
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md text-center">
            <div className="bg-destructive/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive h-8 w-8" />
            </div>
            <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You need to be connected as an admin user to access this page.
            </p>
            <Button onClick={() => router.push("/community")}>
              Go to Community
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const user = getGitHubUser();
  const pendingKits = kits.filter((k) => k.status === "pending");
  const approvedKits = kits.filter((k) => k.status === "approved");
  const rejectedKits = kits.filter((k) => k.status === "rejected");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Wrapper>
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
            <Shield className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Logged in as{" "}
              <span className="text-primary font-medium">{user?.username}</span>
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardDescription>Pending Review</CardDescription>
              <CardTitle className="text-chart-4 text-3xl">
                {pendingKits.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardDescription>Approved Kits</CardDescription>
              <CardTitle className="text-primary text-3xl">
                {approvedKits.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardDescription>Total Admins</CardDescription>
              <CardTitle className="text-3xl">{adminUsers.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="kits" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="kits" className="gap-2">
              <Package className="h-4 w-4" />
              Manage Kits
            </TabsTrigger>
            <TabsTrigger value="admins" className="gap-2">
              <Users className="h-4 w-4" />
              Manage Admins
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kits" className="space-y-4">
            {kits.length === 0 ? (
              <Card className="bg-card/50">
                <CardContent className="text-muted-foreground pt-6 text-center">
                  No kits to manage yet.
                </CardContent>
              </Card>
            ) : (
              kits.map((kit) => (
                <Card key={kit.id} className="bg-card/50 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="truncate font-semibold">{kit.name}</h3>
                          <Badge
                            variant="outline"
                            className={statusStyles[kit.status]}
                          >
                            {kit.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2 line-clamp-1 text-sm">
                          {kit.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {kit.stack.map((tech) => (
                            <span
                              key={tech}
                              className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 font-mono text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-2">
                        {kit.status !== "approved" && (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(kit.id)}
                            className="gap-1"
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </Button>
                        )}
                        {kit.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(kit.id)}
                            className="gap-1"
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(kit.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="admins" className="space-y-4">
            {/* Add Admin */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Add Admin User</CardTitle>
                <CardDescription>
                  Enter a GitHub username to grant admin access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="GitHub username"
                    value={newAdminUsername}
                    onChange={(e) => setNewAdminUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddAdmin()}
                  />
                  <Button
                    onClick={handleAddAdmin}
                    className="flex-shrink-0 gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add Admin
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin List */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Current Admins</CardTitle>
                <CardDescription>
                  Users who can approve or reject kit submissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {adminUsers.map((username) => (
                  <div
                    key={username}
                    className="bg-secondary/50 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://github.com/${username}.png`}
                        alt={username}
                        className="border-border h-8 w-8 rounded-full border"
                      />
                      <span className="font-medium">{username}</span>
                      {username === "thelastofinusa" && (
                        <Badge variant="outline" className="text-xs">
                          Owner
                        </Badge>
                      )}
                    </div>
                    {username !== "thelastofinusa" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveAdmin(username)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Wrapper>
    </div>
  );
}
