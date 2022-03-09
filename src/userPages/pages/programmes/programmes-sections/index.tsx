import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ArrowWhiteIcon from "../../../static/images/arrow-white.png";
import { useHistory, useParams } from "react-router";
import { getProgrammeDetails, getProgrammeSections } from "../../../../services/common";
import { SectionData } from "../../../../common/types";
import { useSnackbar } from "notistack";
import completedIcon from "../../../static/images/completed.png";
import LockIcon from "../../../static/images/lock-icon.png";
import "./style.scss";

interface ProgrammePageParams {
  programmeId: string;
}

const ProgrammeSection = () => {
  const history = useHistory();
  const [programme, setProgramme] = useState<any>(null);
  const { programmeId } = useParams<ProgrammePageParams>();
  const { enqueueSnackbar } = useSnackbar();

  const [sections, setSections] = useState<SectionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgrammeSections(Number(programmeId));
        const programmeDetails: any = await getProgrammeDetails(programmeId);
        setProgramme(programmeDetails.data);
        let arr: any = [];
        programmeDetails.data.section_order.filter(function (order: any) {
          return response.data.forEach(function (list: any) {
            if (order === list.id) {
              arr.push(list);
            }
          });
        });

        let isCurrentStep = false;
        arr.forEach((item: any) => {
          if (!item.is_section_completed && !isCurrentStep) {
            item.current_step = true;
            isCurrentStep = true;
          } else if (!item.is_section_completed) {
            item.is_locked = true;
          }
        });
        setSections(arr);
      } catch (error) {
        enqueueSnackbar("Could not fetch sections", { variant: "error" });
      }
    };
    fetchData();
  }, [programmeId, enqueueSnackbar]);

  const sectionHandler = (item: any) => {
    // if (item.step_order) history.push(`/user-steps/${item.id}/${item.step_order[0]}`);
    history.push(`/user-section-steps/${item.id}/`);
  };

  const getStarted = () => {
    let obj = sections.filter((item: any) => item.is_section_completed === false);
    // if (item.step_order) history.push(`/user-steps/${item.id}/${item.step_order[0]}`);
    history.push(`/user-section-steps/${obj[0].id}/`);
  };

  return (
    <Grid
      className="programmes-section"
      container
      style={{
        backgroundColor: "#F1F5FF",
        maxWidth: "420px",
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid item container direction="column">
        <Grid
          item
          sx={{
            padding: "6% 5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2%",
          }}
        >
          <Typography sx={{ fontWeight: "500" }} variant="h6" gutterBottom component="p">
            Learning Journey
          </Typography>
        </Grid>

        <Grid className="section" onClick={getStarted}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0 13px",
              marginBottom: "20px !important",
            }}
          >
            <img width="68px" src={programme?.image} alt="programme img" />
            <p className={"programmes-title"}>{programme?.name}</p>
          </Grid>
          <Grid className="footer programme-footer">
            <Typography
              sx={{
                fontWeight: "700",
                margin: "0",
                fontSize: "18px !important",
                color: "white",
              }}
              variant="h5"
              gutterBottom
              component="p"
            >
              Get Started
            </Typography>
            <img
              style={{ marginRight: "20px", objectFit: "cover", borderRadius: "4px" }}
              src={ArrowWhiteIcon}
              width="12px"
              height="23px"
              alt="arrow icon"
            />
          </Grid>
        </Grid>

        {sections &&
          sections.map((item: any, index: number) => {
            return (
              <Grid
                key={index}
                className="section"
                onClick={() => {
                  !item.is_section_completed && sectionHandler(item);
                }}
              >
                <p className={"section-title"}>{item.title}</p>
                <p className={"section-step"}>
                  {item.completed_steps} / {item.steps} Steps completed
                </p>
                <Grid className={"footer ".concat(item.is_section_completed ? "completed" : "")}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      margin: "0",
                      fontSize: "18px !important",
                      color: "white",
                    }}
                    variant="h5"
                    gutterBottom
                    component="p"
                  >
                    {item.is_section_completed ? "Completed" : "Continue"}
                  </Typography>

                  <img
                    style={{ marginRight: "20px" }}
                    src={
                      item?.is_section_completed
                        ? completedIcon
                        : item.current_step
                        ? ArrowWhiteIcon
                        : LockIcon
                    }
                    width={item?.is_section_completed ? "18px" : item.is_locked ? "25px" : "12px"}
                    height={item?.is_section_completed ? "16px" : item.is_locked ? "23px" : "23px"}
                    alt="arrow icon"
                  />
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default ProgrammeSection;
