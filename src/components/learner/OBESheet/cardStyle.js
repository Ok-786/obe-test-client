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
    const totalMarks = props.data && props.data.reduce((total, prog) => total + prog.weightage, 0)
    const achievedmarks = props.data && props.data.reduce((total, prog) => total + prog.marks, 0)
    const classes = useStyles();
    const percen = Math.round((props.percentage + Number.EPSILON) * 100) / 100;
    const pers = percen <= 100 ? percen : 100;
    const IconPerformance = props.iconPerformance;
    console.log("rrrrrrrrrrr")
    console.log(props.data2)

    var courseMarks2 = []
    var totalMarks2 = []

    courseMarks2 = props.data2 && props.data2.obe.reduce((acc, { type, marks }) => {
        if (acc[type]) {
            acc[type] += marks;
        } else {
            acc[type] = marks;
        }
        return acc;
    }, {});

    totalMarks2 = props.data2 && props.data2.obe.reduce((acc, { type, weightage }) => {
        if (acc[type]) {
            acc[type] += weightage;
        } else {
            acc[type] = weightage;
        }
        return acc;
    }, {});
    const newArray = props.data2 && Object.keys(courseMarks2).map((type) => ({
        type,
        marks: courseMarks2[type],
        weightage: totalMarks2[type],
    }));

    console.log("ooooooooooooooooooo")
    console.log(newArray)

    if (props.type == "program")
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
                        <Typography variant="h6"> Total Courses: {props.data.length}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid container justifyContent="flex-end" className={classes.detail}>
                        <Typography align="left">
                            Total Marks: <spam style={{ fontWeight: 'bold' }}>{totalMarks}</spam>
                            <br />
                            Scored Marks: <spam style={{ fontWeight: 'bold' }}>{achievedmarks}</spam>
                        </Typography>
                    </Grid>
                </Grid>

                <Divider style={{ color: "#000" }} />

                <Grid container xs justify="flex-start" className={classes.title}>
                    <Typography>
                        <spam style={{}}>Grade:</spam> {calculateGrade(totalMarks, achievedmarks) == "F" ? <spam style={{ color: 'red' }}>{calculateGrade(totalMarks, achievedmarks)}</spam> : <spam style={{ color: 'Green' }}>{calculateGrade(totalMarks, achievedmarks)}</spam>}
                    </Typography>
                </Grid>

                {/* <Grid item xs align="center">
        <Typography>{third}</Typography>
      </Grid> */}
            </Paper>
        );
    else
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
                        <Typography variant="h6"> Assessment Attempts: {props.data2 && props.data2.obe.length}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid container justifyContent="flex-end" className={classes.detail}>
                        <Typography align="left">
                            Passed Assesments:<spam style={{ color: 'green' }}> {props.data2 && calculateAbove50Percent(newArray)[0]} </spam>
                            <br />
                            Failed Assesments:<spam style={{ color: 'red' }}> {props.data2 && calculateAbove50Percent(newArray)[1]} </spam>
                        </Typography>
                    </Grid>
                </Grid>

                <Divider style={{ color: "#000" }} />

                <Grid container xs justify="flex-start" className={classes.title}>
                    <Typography>
                        Student Id: <spam style={{ fontWeight: 'bold' }}>{props.data2 && props.data2.obe[0].learnerId}</spam>
                    </Typography>
                </Grid>

                {/* <Grid item xs align="center">
        <Typography>{third}</Typography>
      </Grid> */}
            </Paper>
        );
}
