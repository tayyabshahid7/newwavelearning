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
import { getSectionSteps } from "services/common";
import AddStepDialog from "components/AddStepDialog";

interface SectionStepsTableProps {
  sectionId: number;
  onDelete: (stepId: number) => void;
}

const SectionStepsTable = ({ sectionId, onDelete }: SectionStepsTableProps) => {
  const history = useHistory();
  const [steps, setSteps] = useState<StepData[]>([]);
  const [dialog, setDialog] = useState<any>({
    open: false,
    step: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(sectionId){
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

  const handleConfirm = () => {
    onDelete(dialog.step.id);
    setDialog({ ...dialog, open: false });
  };

  const openAddStepDialog = () => {
    setDialog({ ...dialog, open: "add" });
  };

  const closeDialog = () => {
    setDialog({ section: null, open: false });
  };

  const addStep = (stepType: string) => {
    setDialog({ ...dialog, open: false });
    //  TODO: redirect to the corresponding step type form based on Step type selected
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
                <TableCell>{step.step_type}</TableCell>
                <TableCell align="right">
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button
                      size="small"
                      onClick={() => history.push(`/programmes/sections/${step.id}`)}
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
              <TableCell align="right" colSpan={4}>
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
        continueCallback={addStep}
      />
    </>
  );
};

export default SectionStepsTable;
