const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/**
 * Rectagle
 */
// ctx.fillStyle = '#3498db';
// ctx.fillRect(20, 20, 150, 100);
// ctx.fillRect(190, 20, 150, 100);

/**
 * Path
 */

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 200);
// ctx.lineTo(150, 50);
ctx.closePath();
ctx.stroke();
