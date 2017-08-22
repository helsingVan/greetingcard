/**
 * @file clock.js
 *
 *
 */

 var canvas = document.getElementById('canvas');
 var ctx = canvas.getContext('2d');

 ctx.beginPath();
 ctx.arc(200,200,100,0,2*Math.PI);
 ctx.lineWidth = 20;
 ctx.strokeStyle = 'red';
 ctx.stroke();

 ctx.beginPath();
 ctx.arc(200,200,80,0,2*Math.PI);
 ctx.lineWidth = 3;
 ctx.strokeStyle = '#000';
 ctx.stroke();