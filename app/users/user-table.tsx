"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Database } from "@/lib/schema";
type User = Database["public"]["Tables"]["profiles"]["Row"];
interface UserTableProps {
  fetchedUser: User[];
}

export default function UserTable({ fetchedUser }: UserTableProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">User Name</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Biography</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedUser.map((profile, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{profile.display_name}</TableCell>
              <TableCell>{profile.email}</TableCell>
              <TableCell>{profile.biography}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
