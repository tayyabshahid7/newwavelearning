import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Session = {
  id: string | number;
  name: string;
  range?: string | null;
};

interface CohortSessionsTableProps {
  sessions: Array<Session>;
}

const CohortSessionsTable = ({ sessions }: CohortSessionsTableProps) => {
  return (
    <>
      <Typography variant="h5">Sessions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Session Name</TableCell>
              <TableCell align="left">Date range</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map(session => (
              <TableRow key={session.id}>
                <TableCell>{session.name}</TableCell>
                <TableCell>
                  {session.range ? (
                    session.range
                  ) : (
                    <Link component={RouterLink} to={"/cohorts"} underline="none">
                      Add range
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  {session.range && (
                    <Link component={RouterLink} to={"/cohorts"} underline="none">
                      Edit
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default CohortSessionsTable;
