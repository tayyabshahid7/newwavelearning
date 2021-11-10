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
} from "@mui/material";

type Learner = {
  id: string | number;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string;
};

interface CohortLearnersTableProps {
  learners: Array<Learner>;
}

const CohortLearnersTable = ({ learners }: CohortLearnersTableProps) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Last Logged in</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {learners?.map((learner, i) => (
              <TableRow key={learner.id}>
                <TableCell>
                  <b>#{i + 1}</b>
                </TableCell>
                <TableCell>{`${learner.first_name} ${learner.last_name}`}</TableCell>
                <TableCell>{learner.email}</TableCell>
                <TableCell>{learner.last_login}</TableCell>
                <TableCell>Delete | View Details</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan={2}>
                Average
              </TableCell>
              <TableCell>3/15</TableCell>
              <TableCell align="left" colSpan={2}>
                2hrs 32mins
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default CohortLearnersTable;
