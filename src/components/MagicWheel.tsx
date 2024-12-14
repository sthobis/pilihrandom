import { useEffect, useRef } from "react";
import classes from "./MagicWheel.module.css";

type MagicWheelProps = {
  options: string[];
  rotation: number;
  spinning: boolean;
  duration: number;
};

function MagicWheel({
  options,
  rotation,
  spinning,
  duration,
}: MagicWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    canvas.width = 640;
    canvas.height = 640;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = [
      "#FF4081", // Bright Pink
      "#5E3CD1", // Deep Purple
      "#2AB673", // Bright Green
      "#FFA726", // Warm Orange
    ];

    if (options.length === 0) {
      // Draw dummy wheel with 4 slices
      const dummySliceAngle = (2 * Math.PI) / 4;
      const startOffset = -Math.PI / 2;

      for (let i = 0; i < 4; i++) {
        const startAngle = startOffset + i * dummySliceAngle;
        const endAngle = startAngle + dummySliceAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();
      }
      return;
    }

    const sliceAngle = (2 * Math.PI) / options.length;
    // Start at -Math.PI/2 (12 o'clock) instead of 0 (3 o'clock)
    const startOffset = -Math.PI / 2;

    options.forEach((option, index) => {
      const startAngle = startOffset + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.stroke();

      // Add text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);

      // Text styling
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = "600 42px sans-serif";

      // Calculate text position and rotation
      const textDistance = radius * 1;
      const text = option.trim();

      // Adjust text rotation based on position
      if (
        startAngle + sliceAngle / 2 > 0 &&
        startAngle + sliceAngle / 2 < Math.PI
      ) {
        ctx.rotate(Math.PI);
        ctx.textAlign = "right";
        ctx.fillText(text, -textDistance * 0.2, 0);
      } else {
        ctx.textAlign = "left";
        ctx.fillText(text, textDistance * 0.2, 0);
      }

      ctx.restore();
    });
  }, [options]);

  return (
    <div className={`${classes.container} ${spinning ? classes.spinning : ""}`}>
      <canvas
        className={classes.canvas}
        ref={canvasRef}
        style={{
          transform: `rotate(${rotation}deg)`,
          transitionDuration: `${duration}ms`,
        }}
      />
      <div className={classes.pointer} />
    </div>
  );
}

export default MagicWheel;
