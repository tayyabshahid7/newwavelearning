import React from "react";
import {
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
import SessionRanges from "./SessionRanges";
import { Session } from "../../common/types";

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
              <TableCell width={400} align="left">
                Session Name
              </TableCell>
              <TableCell align="left">Date range</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions?.map(session => (
              <TableRow key={session.id}>
                <TableCell>Session (Step: {session.step_number})</TableCell>
                <TableCell>
                  <SessionRanges session={session} />
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
