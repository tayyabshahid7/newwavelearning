import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ArrowWhiteIcon from "../../../static/images/arrow-white.png";
import completedIcon from "../../../static/images/completed.png";
import LockIcon from "../../../static/images/lock-icon.png";
import { useHistory, useParams } from "react-router";
import { getSection, getSectionSteps } from "../../../../services/common";
import { StepData } from "../../../../common/types";
import { useSnackbar } from "notistack";
import "./style.scss";

interface ProgrammePageParams {
  sectionId: any;
}

const StepsList = () => {
  const history = useHistory();
  const { sectionId } = useParams<ProgrammePageParams>();
  const [steps, setSteps] = useState<StepData[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData = await getSection(sectionId);
        setSection(sectionData);
      } catch (error: any) {
        enqueueSnackbar(error.response?.data.detail, { variant: "error" });
      }
    };
    fetchData();
  }, [sectionId, enqueueSnackbar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sectionId) {
          let isCurrentStep = false;
          const response = await getSectionSteps(sectionId);
          response.data.forEach((item: any) => {
            if (!item.is_answered && !isCurrentStep) {
              item.current_step = true;
              isCurrentStep = true;
            } else if (!item.is_answered) {
              item.is_locked = true;
            }
          });
          setSteps(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sectionId]);

  const stepHandler = (item: any) => {
    history.push(`/user-steps/${sectionId}/${item.id}`);
  };

  const getStarted = () => {
    let obj = steps.filter((item: any) => item.is_answered === false);
    history.push(`/user-steps/${sectionId}/${obj[0].id}`);
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

        <Grid className="step" onClick={getStarted}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0 13px 0 0",
              marginBottom: "20px !important",
              margin: "0 8px 0 0",
              maxWidth: "10px",
            }}
          >
            <p className={"programmes-title"}>{section?.title}</p>
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

        {steps &&
          steps.map((item: any, index: number) => {
            return (
              <Grid
                key={index}
                className="step "
                onClick={() => {
                  !item.is_answered && stepHandler(item);
                }}
              >
                <p className={"step-title"}>{item.fields?.question || item.fields?.title}</p>
                <p className={"section-step"}>{item.is_answered ? "Completed" : "Not Completed"}</p>
                <Grid className={"footer ".concat(item?.is_answered ? "completed" : "")}>
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
                    {item.is_answered ? "Completed" : "Continue"}
                  </Typography>
                  <img
                    style={{ marginRight: "20px" }}
                    src={
                      item?.is_answered
                        ? completedIcon
                        : item.current_step
                        ? ArrowWhiteIcon
                        : LockIcon
                    }
                    width={item?.is_answered ? "18px" : item.is_locked ? "25px" : "12px"}
                    height={item?.is_answered ? "16px" : item.is_locked ? "23px" : "23px"}
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

export default StepsList;
