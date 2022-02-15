import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { getStepDetails } from "../../../services/common";
import "./style.scss";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";

type IntroParams = {
  stepId: string;
};

const Intro = () => {
  const { stepId } = useParams<IntroParams>();
  const [loading, setLoading] = useState(false);
  const [stepData, setStepData] = useState<any>({
    content: "",
    image: "",
    title: "",
  });

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response = await getStepDetails(stepId);
        debugger;
        setStepData(response.fields);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, []);

  return (
    <Grid
      container
      className="intro"
      style={{
        backgroundColor: "#FFFFFF",
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
            padding: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
          mt="10%"
        >
          <img
            style={{ borderRadius: "50%" }}
            src={stepData.image && stepData.image}
            width="235px"
            height="235px"
            alt="New Wave Learning Logo"
          />
          <Typography sx={{ margin: "15% 0 5% 0", fontWeight: "600" }} variant="h5" gutterBottom>
            {stepData.title}
          </Typography>
        </Grid>

        <Grid item sx={{ padding: "2% 10%", textAlign: "center" }}>
          <Typography component="h5" sx={{ fontSize: "16px", color: "#6A6E71" }}>
            {stepData.content}
          </Typography>
        </Grid>
      </Grid>
      <Grid mt="100px" item px="18px" width="100%">
        <Button
          sx={{ padding: "13.39px", fontSize: "20px", fontWeight: 500 }}
          variant="contained"
          fullWidth
          size="large"
          onClick={() => {}}
          disabled={loading}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Intro;
