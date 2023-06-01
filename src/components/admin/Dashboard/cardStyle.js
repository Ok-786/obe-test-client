import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Hidden from "@mui/material/Hidden";
// import makeStyles from "@material-ui/core/styles/makeStyles";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import calculateGrade from '../../../utils/functions/gradeCalc';
const theme = createTheme({
    spacing: 8, // define the spacing function
    // other theme options
});

const useStyles = makeStyles(() => createStyles({
    card: {
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        position: "relative",
        // border: "1px solid #000",
        padding: theme.spacing(1, 2),
        width: "100%",
        margin: theme.spacing(2)
    },
    title: {
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0)
    },
    persentage: {
        padding: theme.spacing(1),
        // border: "1px solid #000",
        margin: theme.spacing(1)
    },
    detail: {
        padding: theme.spacing(1),
        margin: theme.spacing(2, 0, 2, 0)
        // border: "1px solid #000",
    },

    boxicon: {
        height: "100px",
        width: "100px",
        display: "flex",
        position: "absolute",
        zIndex: 1,
        top: -20,
        left: 12,
        color: "#ff0000",
        // background:"linear-gradient(90deg, rgba(40,214,0,1) 0%, rgba(93,170,67,1) 88%)",
        // border: "2px solid #745223",
        borderRadius: "25%",
        justifyContent: "center",
        alignItems: "center"
    },
    icons: {
        minWidth: 60,
        minHeight: 60,
        color: "#ffffff"
    }
}));


function calculateAbove50Percent(newArray) {
    let count = 0;
    let count2 = 0;
    newArray.forEach(({ type, marks, weightage }) => {
        const percentage = (marks / weightage) * 100;
        if (percentage >= 50) {
            count++;
        } else
            count2++
    });
    return [count, count2];
}


export default function Card(props) {
    const classes = useStyles();
    const IconPerformance = props.iconPerformance;
    console.log("rrrrrrrrrrr")
    console.log(props.data2)





    return (
        <Paper className={classes.card}>
            <Grid container>
                <Hidden only="sm">
                    <Grid className={classes.boxicon} style={{ background: props.color }}>
                        <IconPerformance className={classes.icons} />
                    </Grid>
                </Hidden>

                <Grid
                    container
                    className={classes.persentage}
                    justifyContent="flex-end"
                >
                    <Typography variant="h6"> {props.primary}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid container justifyContent="flex-end" className={classes.detail}>

                </Grid>
            </Grid>

            <Divider style={{ color: "#000" }} />

            <Grid container xs justify="flex-start" className={classes.title}>
                <Typography>
                    <Typography align="left">
                        {props.secondary} <spam style={{ fontWeight: 'bold' }}>{props.data && props.data.length}</spam>
                        <br />
                    </Typography>
                </Typography>
            </Grid>

            {/* <Grid item xs align="center">
        <Typography>{third}</Typography>
      </Grid> */}
        </Paper>
    );
}
