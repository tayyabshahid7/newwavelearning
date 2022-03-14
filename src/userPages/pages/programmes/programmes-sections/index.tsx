import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ArrowWhiteIcon from "../../../static/images/arrow-white.png";
import { useHistory, useParams } from "react-router";
import { getProgrammeDetails, getProgrammeSections } from "../../../../services/common";
import { SectionData } from "../../../../common/types";
import { useSnackbar } from "notistack";
import completedIcon from "../../../static/images/completed.png";
import LockIcon from "../../../static/images/lock-icon.png";
import arrowIcon from "../../../static/images/right-arrow 6.png";
import { Burger, Menu } from "../../../components/BurgerMenu";
import Loading from "../../../../components/Loading";
import "./style.scss";

interface ProgrammePageParams {
  programmeId: string;
}

const ProgrammeSection = () => {
  const history = useHistory();
  const [programme, setProgramme] = useState<any>(null);
  const { programmeId } = useParams<ProgrammePageParams>();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const node: any = useRef();
  const [sections, setSections] = useState<SectionData[]>([]);
  const [completedStepCount, setCompletedStepCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        let obj = arr.filter((item: any) => item.completed_steps > 0);
        if (obj.length > 0) {
          setCompletedStepCount(1);
        }
        setSections(arr);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (error) {
        setLoading(false);
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
        position: "relative",
        backgroundColor: "#F1F5FF",
        maxWidth: "420px",
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Loading loading={loading} />
      <Grid item container direction="column">
        <Grid
          item
          sx={{
            padding: "6% 5%",
            display: "flex",
            alignItems: "center",
            marginBottom: "2%",
          }}
        >
          <img
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
            src={arrowIcon}
            width="27px"
            height="27px"
            alt="Arrow Logo"
          />
          <Typography sx={{ fontWeight: "500" }} ml="20px" variant="h6" gutterBottom component="p">
            Learning Journey
          </Typography>
          <Grid ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <Menu
              open={open}
              setOpen={setOpen}
              close={() => {
                setOpen(false);
              }}
            />
          </Grid>
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

        {sections &&
          sections.map((item: any, index: number) => {
            return (
              <Grid
                key={index}
                className="section"
                onClick={() => {
                  (item.current_step || item.is_section_completed) && sectionHandler(item);
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
