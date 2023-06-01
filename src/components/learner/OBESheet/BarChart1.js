import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

export default function BarChart1({ data, type }) {
    var courseMarks = []
    var totalMarks = []
    if (type == "1") {
        courseMarks = data.reduce((acc, { type, marks }) => {
            if (acc[type]) {
                acc[type] += marks;
            } else {
                acc[type] = marks;
            }
            return acc;
        }, {});
        
        totalMarks = data.reduce((acc, { type, weightage }) => {
            if (acc[type]) {
                acc[type] += weightage;
            } else {
                acc[type] = weightage;
            }
            return acc;
        }, {});
        const newArray = Object.keys(courseMarks).map((type) => ({
            type,
            marks: courseMarks[type],
            weightage: totalMarks[type],
        }));
        console.log("newArray")
        console.log(newArray)
        return (
            <BarChart width={800} height={300} data={newArray}>
                <XAxis dataKey="type" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="marks" barSize={20}>
                    {newArray.map((entry, index) => {
                        const weightage = newArray[index].weightage/* get the weightage value for the current entry */;
                        const markPercentage = entry.marks / weightage * 100;
                        const barColor = markPercentage < 50 ? "red" : "aqua";
                        return (
                            <Cell key={`cell-${index}`} fill={barColor} />
                        );
                    })}
                </Bar>
                
            </BarChart>
        )
    }
    else if (type == "2") {
        courseMarks = data.reduce((acc, { courseTitle, marks }) => {
            if (acc[courseTitle]) {
                acc[courseTitle] += marks;
            } else {
                acc[courseTitle] = marks;
            }
            return acc;
        }, {});
        totalMarks = data.reduce((acc, { courseTitle, weightage }) => {
            if (acc[courseTitle]) {
                acc[courseTitle] += weightage;
            } else {
                acc[courseTitle] = weightage;
            }
            return acc;
        }, {});
        const newArray = Object.keys(courseMarks).map((courseTitle, weightage) => ({
            courseTitle,
            marks: courseMarks[courseTitle],
            weightage: totalMarks[courseTitle],
        }));
        console.log("newArray")
        console.log(newArray)
        return (
            <BarChart width={800} height={300} data={newArray}>
                <XAxis dataKey="courseTitle" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="marks" barSize={20}>
                    {newArray.map((entry, index) => {
                        const weightage = newArray[index].weightage/* get the weightage value for the current entry */;
                        const markPercentage = entry.marks / weightage * 100;
                        const barColor = markPercentage < 50 ? "red" : "aqua";
                        return (
                            <Cell key={`cell-${index}`} fill={barColor} />
                        );
                    })}
                </Bar>
            </BarChart>
        )
    }
}