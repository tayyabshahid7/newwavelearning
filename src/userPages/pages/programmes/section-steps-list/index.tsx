import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ArrowWhiteIcon from "../../../static/images/arrow-white.png";
import completedIcon from "../../../static/images/completed.png";
import LockIcon from "../../../static/images/lock-icon.png";
import { useHistory, useParams } from "react-router";
import { getProgrammeDetails, getSection, getSectionSteps } from "../../../../services/common";
import { StepData } from "../../../../common/types";
import { useSnackbar } from "notistack";
import "./style.scss";
import arrowIcon from "../../../static/images/right-arrow 6.png";
import { Burger, Menu } from "../../../components/BurgerMenu";
import Loading from "../../../../components/Loading";
import SideNavbar from "../../../components/SideNavbar";
import sidebarBgImage from "../../../static/images/leftBar.svg";

interface ProgrammePageParams {
  cohortId: any;
  sectionId: any;
}

const StepsList = () => {
  const history = useHistory();
  const { cohortId, sectionId } = useParams<ProgrammePageParams>();
  const [steps, setSteps] = useState<StepData[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [section, setSection] = useState<any>(null);
  const node: any = useRef();
  const [open, setOpen] = useState(false);
  const [completedStepCount, setCompletedStepCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [programmeId, setProgrammeId] = useState<any>("");
  const [programme, setProgramme] = useState<any>(null);

  const getStepData = useCallback(
    async (stepOrder: any) => {
      setLoading(true);
      try {
        if (sectionId) {
          let isCurrentStep = false;
          const response = await getSectionSteps(sectionId, false, cohortId);
          let arr: any = [];
          stepOrder.filter(function (order: any) {
            return response.data.forEach(function (list: any) {
              if (order === list.id) {
                arr.push(list);
              }
            });
          });

          arr.forEach((item: any) => {
            if (!item.is_answered && !isCurrentStep) {
              item.current_step = true;
              isCurrentStep = true;
            } else if (!item.is_answered) {
              item.is_locked = true;
            }
          });

          let obj = arr.filter((item: any) => item.is_answered === true);
          if (obj.length > 0) {
            setCompletedStepCount(1);
          }
          setSteps(arr);
          setTimeout(() => {
            setLoading(false);
          }, 300);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [sectionId, cohortId]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData: any = await getSection(sectionId, cohortId);
        setSection(sectionData);
        setProgrammeId(sectionData.programme);
        const response = await getProgrammeDetails(sectionData.programme);
        setProgramme(response.data);
        await getStepData(sectionData?.step_order);
      } catch (error: any) {
        enqueueSnackbar(error.response?.data.detail, { variant: "error" });
      }
    };
    fetchData();
  }, [getStepData, sectionId, enqueueSnackbar, cohortId]);

  const stepHandler = (item: any) => {
    history.push(`/user-steps/${cohortId}/${sectionId}/${item.id}`);
  };

  const getStarted = () => {
    let obj = steps.filter((item: any) => item.is_answered === false);
    history.push(`/user-steps/${cohortId}/${sectionId}/${obj[0].id}`);
  };

  return (
    <Grid container sx={{ display: "flex" }}>
      <Grid
        item
        xs={2}
        sx={{
          width: "22%",
          position: "relative",
          "@media (max-width: 768px)": {
            width: "0 !important",
          },
          "@media (max-width: 1024px)": {
            width: "36%",
          },
        }}
      >
        <SideNavbar cohortId={cohortId} programmeId={programmeId} />
      </Grid>
      <Grid
        item
        xs={8}
        className="programmes-section mobile"
        container
        style={{
          position: "relative",
          backgroundColor: "#F1F5FF",
          margin: "auto",
          minHeight: "100vh",
        }}
      >
        <Loading loading={loading} />
        <Grid item container direction="column">
          <Grid
            item
            sx={{
              padding: "6% 0",
              display: "flex",
              alignItems: "center",
              marginBottom: "2%",
            }}
          >
            <img
              className={"back-arrow"}
              onClick={() => history.goBack()}
              style={{ cursor: "pointer" }}
              src={arrowIcon}
              width="27px"
              height="27px"
              alt="Arrow Logo"
            />
            <Typography
              sx={{ fontWeight: "500" }}
              ml="20px"
              variant="h6"
              gutterBottom
              component="p"
            >
              {section?.title}
            </Typography>
            <Grid ref={node}>
              <Burger open={open} setOpen={setOpen} />
            </Grid>
            <Menu
              cohortId={cohortId}
              open={open}
              setOpen={setOpen}
              close={() => {
                setOpen(false);
              }}
            />
          </Grid>

          <Grid className="step" onClick={getStarted}>
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0 13px 0 0",
                marginBottom: "20px !important",
                margin: "0 8px 0 0",
              }}
            >
              <img src={programme?.image} alt="programme logo" width="60px" />
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
                {completedStepCount > 0 ? "Continue" : "Get Started"}
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
                    (item.current_step || item.is_answered) && stepHandler(item);
                  }}
                >
                  <p className={"step-title"}>{item.fields?.question || item.fields?.title}</p>
                  <p className={"section-step"}>
                    {item.is_answered ? "Completed" : "Not Completed"}
                  </p>
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
      <Grid
        item
        xs={2}
        sx={{
          background: `url(${sidebarBgImage}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      ></Grid>
    </Grid>
  );
};

export default StepsList;
