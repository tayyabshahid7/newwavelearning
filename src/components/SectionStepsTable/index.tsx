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
import { deleteStep, editSection, getSectionSteps } from "services/common";
import AddStepDialog from "components/AddStepDialog";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { DragHandle } from "@mui/icons-material";

interface SectionStepsTableProps {
  sectionId: number;
  stepOrder: number[];
}

const SectionStepsTable = ({ sectionId, stepOrder }: SectionStepsTableProps) => {
  const history = useHistory();
  const [steps, setSteps] = useState<StepData[]>([]);
  const [order, setOrder] = useState<number[]>(stepOrder);
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
      const newOrder = order.filter(orderId => orderId !== dialog.step.id);
      await editSection(sectionId, { step_order: newOrder });
      setOrder(newOrder);
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

  const handleOrderChange = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const newOrder = Array.from(order);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, parseInt(draggableId));
    try {
      await editSection(sectionId, { step_order: newOrder });
      setOrder(newOrder);
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log(order);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Steps</Typography>
        <Button onClick={openAddStepDialog}>Add Step</Button>
      </Stack>
      <DragDropContext onDragEnd={handleOrderChange}>
        <TableContainer component={Paper}>
          <Table>
            <Droppable droppableId="step-table">
              {(provided: any, snapshot: any) => (
                <TableBody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ backgroundColor: snapshot.isDraggingOver ? "#dbdbdb" : "inherit" }}
                >
                  {order?.map((orderId: number, index: number) => {
                    const step = steps?.find((s: any) => s.id === orderId);
                    return (
                      step && (
                        <Draggable draggableId={`${step.id}`} index={index} key={orderId}>
                          {(provided: any, snapshot: any) => (
                            <TableRow
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              sx={{ backgroundColor: snapshot.isDragging ? "#d6f9ff" : "white" }}
                            >
                              <TableCell {...provided.dragHandleProps}>
                                <DragHandle sx={{ color: "lightgrey" }} />
                              </TableCell>
                              <TableCell>{step.name}</TableCell>
                              <TableCell>{step.fields.title || step.fields.question}</TableCell>
                              <TableCell>{step.step_type?.replaceAll("_", " ")}</TableCell>
                              <TableCell>
                                {step.fields.feedback ? "Feedback needed" : "No feedback needed"}
                              </TableCell>
                              <TableCell align="right">
                                <Stack spacing={1} direction="row" justifyContent="flex-end">
                                  <Button
                                    size="small"
                                    onClick={() =>
                                      history.push(
                                        `/sections/${step.section}/steps/${step.id}/edit-${step.step_type}`
                                      )
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
                          )}
                        </Draggable>
                      )
                    );
                  })}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
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
      </DragDropContext>
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
