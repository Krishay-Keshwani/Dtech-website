import { useEffect, useRef } from 'react';

interface CursorTrailProps {
  theme: 'dark' | 'light';
}

export default function CursorTrail({ theme }: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;

    const color = theme === 'light' ? '13, 148, 136' : '13, 242, 201'; // teal rgb values

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add a new point if the mouse is active
      if (mouseRef.current.active) {
        const points = pointsRef.current;
        const lastPoint = points[points.length - 1];
        if (!lastPoint || Math.hypot(lastPoint.x - mouseRef.current.x, lastPoint.y - mouseRef.current.y) > 2) {
          points.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            age: 0,
          });
        }
      }

      // Update and draw points
      const points = pointsRef.current;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;

        const maxAge = 25; // life of particle in frames
        if (p.age > maxAge) {
          points.splice(i, 1);
          i--;
          continue;
        }

        const ratio = (maxAge - p.age) / maxAge; // 1 to 0
        const radius = 6 * ratio; // decreasing radius
        const opacity = 0.45 * ratio;

        // Draw glow effect around each segment
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
        gradient.addColorStop(0, `rgba(${color}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${color}, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw solid center
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity * 1.5})`;
        ctx.fill();
      }

      // Connect points with a glowing bezier-like line
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.quadraticCurveTo(
          points[points.length - 2].x,
          points[points.length - 2].y,
          points[points.length - 1].x,
          points[points.length - 1].y
        );
        ctx.strokeStyle = `rgba(${color}, 0.25)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-90"
      style={{ mixBlendMode: theme === 'light' ? 'multiply' : 'screen' }}
    />
  );
}
