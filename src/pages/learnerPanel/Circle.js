import React, { useRef, useEffect } from "react";

const Circle = ({ point, radius, color }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }, [point, radius, color]);

    return <canvas ref={canvasRef} />;
};

export default Circle;