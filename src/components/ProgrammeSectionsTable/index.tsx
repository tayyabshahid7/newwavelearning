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
import AddSectionDialog from "components/AddSectionDialog";
import { deleteSection, duplicateSection, editProgramme, getProgrammeSections } from "services/common";
import { SectionData } from "common/types";
import { useSnackbar } from "notistack";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import DragHandleIcon from "@mui/icons-material/DragHandle";

interface ProgrammeSectionsTableProps {
  programmeId: number;
  sectionOrder: Array<number>;
}

const ProgrammeSectionsTable = ({ programmeId, sectionOrder }: ProgrammeSectionsTableProps) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [sections, setSections] = useState<SectionData[]>([]);
  const [sectionsOrder, setSectionsOrder] = useState<Array<number>>(sectionOrder);
  const [dialog, setDialog] = useState<any>({
    open: false,
    section: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgrammeSections(programmeId);
        setSections(response.data);
      } catch (error) {
        enqueueSnackbar("Could not fetch sections", { variant: "error" });
      }
    };
    fetchData();
  }, [programmeId, enqueueSnackbar]);

  const handleDeleteSection = (section: SectionData) => {
    setDialog({ section: section, open: "prompt" });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSection(dialog.section.id);
      const newOrder = sectionsOrder.filter(orderId => orderId !== dialog.section.id);
      await editProgramme(programmeId, { section_order: newOrder });
      setSectionsOrder(newOrder);
      const newSections = sections.filter(section => section.id !== dialog.section.id);
      setSections(newSections);
      setDialog({ ...dialog, open: false });
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.response?.data.detail);
    }
  };

  const openDuplicateSectionDialog = (section: SectionData) => {
    setDialog({ section: section, open: "duplicate" });
  };

  const handleDuplicateSection = async () => {
    try {
      const newSection = await duplicateSection(dialog.section.id);
      setSections([...sections, newSection]);
      if (newSection.id) {
        setSectionsOrder([...sectionsOrder, newSection.id]);
      }
    } catch (error: any) {
      console.log(error);
    }
    setDialog({ section: null, open: false });
  };

  const openAddSectionDialog = () => {
    setDialog({ ...dialog, open: "add" });
  };

  const closeDialog = () => {
    setDialog({ section: null, open: false });
  };

  const addSection = async (newSection: SectionData) => {
    setSections([...sections, newSection]);
    if (newSection?.id) {
      const newOrder = [...sectionsOrder, newSection.id];
      await editProgramme(programmeId, { section_order: newOrder });
      setSectionsOrder(newOrder);
    }
    setDialog({ ...dialog, open: false });
  };

  const handleOrderChange = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const newOrder = Array.from(sectionsOrder);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, parseInt(draggableId));
    try {
      await editProgramme(programmeId, { section_order: newOrder });
      setSectionsOrder(newOrder);
    } catch (error: any) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Sections</Typography>
        <Button onClick={openAddSectionDialog}>Add Section</Button>
      </Stack>
      <DragDropContext onDragEnd={handleOrderChange}>
        <TableContainer component={Paper}>
          <Table>
            <Droppable droppableId="sections-table">
              {(provided: any, snapshot: any) => (
                <TableBody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ backgroundColor: snapshot.isDraggingOver ? "#dbdbdb" : "inherit" }}
                >
                  {sectionsOrder?.map((orderId: number, index: number) => {
                    const section = sections?.find((s: any) => s.id === orderId);
                    return (
                      section && (
                        <Draggable draggableId={`${section.id}`} index={index} key={orderId}>
                          {(provided: any, snapshot: any) => (
                            <TableRow
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              sx={{ backgroundColor: snapshot.isDragging ? "#d6f9ff" : "white" }}
                            >
                              <TableCell {...provided.dragHandleProps}>
                                <DragHandleIcon sx={{ color: "lightgrey" }} />
                              </TableCell>
                              <TableCell>{section.title}</TableCell>
                              <TableCell>
                                {section.steps} step{section.steps === 1 ? "" : "s"}
                              </TableCell>
                              <TableCell align="right">
                                <Stack spacing={1} direction="row" justifyContent="flex-end">
                                  <Button
                                    onClick={() =>
                                      history.push(
                                        `/programmes/${programmeId}/sections/${section.id}`
                                      )
                                    }
                                  >
                                    View Section
                                  </Button>
                                  <Button
                                    variant="text"
                                    onClick={() => openDuplicateSectionDialog(section)}
                                  >
                                    Duplicate
                                  </Button>
                                  <Button
                                    variant="text"
                                    color="error"
                                    onClick={() => handleDeleteSection(section)}
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
                <TableCell align="right" colSpan={4}>
                  Total: {sections?.length}
                </TableCell>
              </TableRow>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </DragDropContext>
      <PromptDialog
        open={dialog.open === "prompt"}
        title="Are you sure you would like to delete the following section?"
        content={`Section: ${dialog.section?.title}`}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={handleConfirmDelete}
        closeCallback={closeDialog}
      />
      <PromptDialog
        open={dialog.open === "duplicate"}
        title="Are you sure you would like to duplicate the following section?"
        content={`Section: ${dialog.section?.title}`}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={handleDuplicateSection}
        closeCallback={closeDialog}
      />
      <AddSectionDialog
        open={dialog.open === "add"}
        programmeId={programmeId}
        cancelCallback={closeDialog}
        addCallback={addSection}
      />
    </>
  );
};

export default ProgrammeSectionsTable;
