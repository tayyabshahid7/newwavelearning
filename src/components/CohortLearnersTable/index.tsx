import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Learner } from "common/types";
import PromptDialog from "components/PromptDialog";

interface CohortLearnersTableProps {
  learners: Array<Learner>;
  onDelete: (learnerId: number) => void;
}

const CohortLearnersTable = ({ learners, onDelete }: CohortLearnersTableProps) => {
  const [dialog, setDialog] = useState<any>({
    open: false,
    learner: null,
  });

  const handleDeleteLearner = (learner: Learner) => {
    setDialog({ learner: learner, open: true });
  };

  const handleConfirm = () => {
    onDelete(dialog.learner.id);
    setDialog({ ...dialog, open: false });
  };
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
                <TableCell>
                  <Button variant="text" color="error" onClick={() => handleDeleteLearner(learner)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan={4}>
                Total:
              </TableCell>
              <TableCell align="left" colSpan={1}>
                {learners?.length}
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <PromptDialog
        open={dialog.open}
        title="Are you sure you would like to delete the following learner?"
        content={`Learner: ${dialog.learner?.email}`}
        match={dialog.learner?.email}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={handleConfirm}
        closeCallback={() => setDialog({ learner: null, open: false })}
      />
    </>
  );
};

export default CohortLearnersTable;
