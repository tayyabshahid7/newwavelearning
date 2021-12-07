import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import PromptDialog from "components/PromptDialog";
import { useHistory } from "react-router";
import { StepData } from "common/types";
import { deleteStep, getSectionSteps } from "services/common";
import AddStepDialog from "components/AddStepDialog";

interface SectionStepsTableProps {
  sectionId: number;
}

const SectionStepsTable = ({ sectionId }: SectionStepsTableProps) => {
  const history = useHistory();
  const [steps, setSteps] = useState<StepData[]>([]);
  const [dialog, setDialog] = useState<any>({
    open: false,
    step: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sectionId) {
          const response = await getSectionSteps(sectionId);
          setSteps(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sectionId]);

  const handleDeleteStep = (step: any) => {
    setDialog({ step: step, open: "prompt" });
  };

  const handleConfirm = async () => {
    try {
      await deleteStep(dialog.step.id);
      const newSteps = steps.filter(s => s.id !== dialog.step.id);
      setSteps(newSteps);
      setDialog({ ...dialog, open: false });
    } catch (error: any) {
      console.log(error);
    }
  };

  const openAddStepDialog = () => {
    setDialog({ ...dialog, open: "add" });
  };

  const closeDialog = () => {
    setDialog({ section: null, open: false });
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Steps</Typography>
        <Button onClick={openAddStepDialog}>Add Step</Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {steps?.map((step: any) => (
              <TableRow key={step.id}>
                <TableCell>
                  <b>#{step.number}</b>
                </TableCell>
                <TableCell>{step.name}</TableCell>
                <TableCell>{step.fields.title}</TableCell>
                <TableCell>{step.step_type}</TableCell>
                <TableCell>
                  {step.fields.feedback ? "Feedback needed" : "No feedback needed"}
                </TableCell>
                <TableCell align="right">
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button
                      size="small"
                      onClick={() =>
                        history.push(`/sections/${step.section}/steps/${step.id}/edit-text-content`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteStep(step)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="left" colSpan={6}>
                Total: {steps?.length}
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <PromptDialog
        open={dialog.open === "prompt"}
        title="Are you sure you would like to delete the following step?"
        content={`Step: ${dialog.step?.number}`}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={handleConfirm}
        closeCallback={closeDialog}
      />
      <AddStepDialog
        open={dialog.open === "add"}
        sectionId={sectionId}
        cancelCallback={closeDialog}
      />
    </>
  );
};

export default SectionStepsTable;
