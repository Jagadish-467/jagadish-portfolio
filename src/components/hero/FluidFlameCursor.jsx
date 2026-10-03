import React, { useEffect, useRef, useState } from 'react';
import './FluidFlameCursor.css';

/* ==========================================================================
   STAS BONDAR SIGNATURE FLUID CRIMSON TRAIL SHADERS (WebGL 2.0)
   ========================================================================== */

const baseVertexShader = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// 1. Advection Shader (Manual Bilinear Sampling for Silky Motion)
const advectionShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_velocity;
uniform sampler2D u_source;
uniform vec2 u_texelSize;
uniform float u_dt;
uniform float u_dissipation;

vec4 bilerp(sampler2D tex, vec2 p, vec2 texelSize) {
  vec2 st = p / texelSize - 0.5;
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec4 a = texture(tex, (i + vec2(0.5, 0.5)) * texelSize);
  vec4 b = texture(tex, (i + vec2(1.5, 0.5)) * texelSize);
  vec4 c = texture(tex, (i + vec2(0.5, 1.5)) * texelSize);
  vec4 d = texture(tex, (i + vec2(1.5, 1.5)) * texelSize);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 coord = v_uv - u_dt * texture(u_velocity, v_uv).xy * u_texelSize;
  fragColor = u_dissipation * bilerp(u_source, coord, u_texelSize);
}
`;

// 2. Splat Shader (Soft Gaussian Injection)
const splatShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_target;
uniform float u_aspectRatio;
uniform vec2 u_point;
uniform vec3 u_color;
uniform float u_radius;

void main() {
  vec2 p = v_uv - u_point;
  p.x *= u_aspectRatio;
  vec3 splat = exp(-dot(p, p) / u_radius) * u_color;
  vec3 base = texture(u_target, v_uv).xyz;
  fragColor = vec4(base + splat, 1.0);
}
`;

// 3. Curl / Vorticity Calculation
const curlShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_velocity;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_velocity, v_uv - vec2(u_texelSize.x, 0.0)).y;
  float R = texture(u_velocity, v_uv + vec2(u_texelSize.x, 0.0)).y;
  float B = texture(u_velocity, v_uv - vec2(0.0, u_texelSize.y)).x;
  float T = texture(u_velocity, v_uv + vec2(0.0, u_texelSize.y)).x;
  float vorticity = R - L - T + B;
  fragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`;

// 4. Vorticity Confinement Force (Subtle Organic Swirls)
const vorticityShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_velocity;
uniform sampler2D u_curl;
uniform float u_curlStrength;
uniform float u_dt;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_curl, v_uv - vec2(u_texelSize.x, 0.0)).x;
  float R = texture(u_curl, v_uv + vec2(u_texelSize.x, 0.0)).x;
  float B = texture(u_curl, v_uv - vec2(0.0, u_texelSize.y)).x;
  float T = texture(u_curl, v_uv + vec2(0.0, u_texelSize.y)).x;
  float C = texture(u_curl, v_uv).x;

  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  float len = length(force) + 0.00001;
  force = (force / len) * u_curlStrength * C;
  force.y *= -1.0;

  vec2 vel = texture(u_velocity, v_uv).xy;
  fragColor = vec4(vel + force * u_dt, 0.0, 1.0);
}
`;

// 5. Divergence Shader
const divergenceShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_velocity;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_velocity, v_uv - vec2(u_texelSize.x, 0.0)).x;
  float R = texture(u_velocity, v_uv + vec2(u_texelSize.x, 0.0)).x;
  float B = texture(u_velocity, v_uv - vec2(0.0, u_texelSize.y)).y;
  float T = texture(u_velocity, v_uv + vec2(0.0, u_texelSize.y)).y;
  vec2 C = texture(u_velocity, v_uv).xy;

  if (v_uv.x - u_texelSize.x < 0.0) L = -C.x;
  if (v_uv.x + u_texelSize.x > 1.0) R = -C.x;
  if (v_uv.y - u_texelSize.y < 0.0) B = -C.y;
  if (v_uv.y + u_texelSize.y > 1.0) T = -C.y;

  float div = 0.5 * (R - L + T - B);
  fragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;

// 6. Pressure Poisson Solver (Jacobi Relaxation)
const pressureShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_pressure;
uniform sampler2D u_divergence;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_pressure, v_uv - vec2(u_texelSize.x, 0.0)).x;
  float R = texture(u_pressure, v_uv + vec2(u_texelSize.x, 0.0)).x;
  float B = texture(u_pressure, v_uv - vec2(0.0, u_texelSize.y)).x;
  float T = texture(u_pressure, v_uv + vec2(0.0, u_texelSize.y)).x;
  float d = texture(u_divergence, v_uv).x;

  float p = (L + R + B + T - d) * 0.25;
  fragColor = vec4(p, 0.0, 0.0, 1.0);
}
`;

// 7. Gradient Subtraction (Projection)
const gradientSubtractShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_pressure;
uniform sampler2D u_velocity;
uniform vec2 u_texelSize;

void main() {
  float L = texture(u_pressure, v_uv - vec2(u_texelSize.x, 0.0)).x;
  float R = texture(u_pressure, v_uv + vec2(u_texelSize.x, 0.0)).x;
  float B = texture(u_pressure, v_uv - vec2(0.0, u_texelSize.y)).x;
  float T = texture(u_pressure, v_uv + vec2(0.0, u_texelSize.y)).x;

  vec2 vel = texture(u_velocity, v_uv).xy;
  vel.xy -= 0.5 * vec2(R - L, T - B);
  fragColor = vec4(vel, 0.0, 1.0);
}
`;

// 8. Stas Bondar Crimson Plasma Display Shader
const stasBondarDisplayShader = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_density;
uniform vec2 u_texelSize;

vec4 bilerp(sampler2D tex, vec2 p, vec2 texelSize) {
  vec2 st = p / texelSize - 0.5;
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec4 a = texture(tex, (i + vec2(0.5, 0.5)) * texelSize);
  vec4 b = texture(tex, (i + vec2(1.5, 0.5)) * texelSize);
  vec4 c = texture(tex, (i + vec2(0.5, 1.5)) * texelSize);
  vec4 d = texture(tex, (i + vec2(1.5, 1.5)) * texelSize);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Exact Stas Bondar Signature Crimson/Ruby Color Ramp
vec4 crimsonGradient(float d) {
  if (d <= 0.002) return vec4(0.0);

  // Volumetric color ramps:
  // Faint smoke: deep garnet / burgundy mist (never yellow or orange)
  // Ribbon body: saturated blood-red / crimson
  // Dense core: luminous incandescent ruby red
  vec3 deepSmoke = vec3(0.30, 0.015, 0.03);
  vec3 crimson   = vec3(0.92, 0.04, 0.05);
  vec3 rubyCore  = vec3(1.00, 0.14, 0.10);

  vec3 color;
  float alpha;

  if (d < 0.24) {
    float t = d / 0.24;
    color = mix(deepSmoke, crimson, t);
    alpha = t * 0.75;
  } else {
    float t = clamp((d - 0.24) / 0.76, 0.0, 1.0);
    color = mix(crimson, rubyCore, t);
    alpha = 0.75 + t * 0.25;
  }

  // Smooth volumetric falloff
  float intensity = min(1.25, pow(d, 0.76) * 1.18);
  return vec4(color * intensity, clamp(alpha * intensity, 0.0, 1.0));
}

void main() {
  vec4 sampleVal = bilerp(u_density, v_uv, u_texelSize);
  fragColor = crimsonGradient(sampleVal.r);
}
`;

export default function FluidFlameCursor() {
  const canvasRef = useRef(null);
  const crosshairRef = useRef(null);
  const [isSupported] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(pointer: coarse)').matches;
  });

  useEffect(() => {
    if (!isSupported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL 2.0 context
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    if (!gl) return;

    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('OES_texture_float_linear');
    document.body.classList.add('fluid-cursor-active');

    // Shader & Program compilation
    const createShader = (type, source) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };

    const createProgram = (vsSrc, fsSrc) => {
      const vs = createShader(gl.VERTEX_SHADER, vsSrc);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSrc);
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      return prog;
    };

    const progAdvection = createProgram(baseVertexShader, advectionShader);
    const progSplat = createProgram(baseVertexShader, splatShader);
    const progCurl = createProgram(baseVertexShader, curlShader);
    const progVorticity = createProgram(baseVertexShader, vorticityShader);
    const progDivergence = createProgram(baseVertexShader, divergenceShader);
    const progPressure = createProgram(baseVertexShader, pressureShader);
    const progGradSubtract = createProgram(baseVertexShader, gradientSubtractShader);
    const progDisplay = createProgram(baseVertexShader, stasBondarDisplayShader);

    // Quad geometry
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );

    const bindQuad = (prog) => {
      const loc = gl.getAttribLocation(prog, 'a_position');
      if (loc >= 0) {
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      }
    };

    // Framebuffer Object (FBO) creation
    const createFBO = (w, h) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return { texture, fbo, width: w, height: h };
    };

    const createDoubleFBO = (w, h) => {
      let fbo1 = createFBO(w, h);
      let fbo2 = createFBO(w, h);
      return {
        width: w,
        height: h,
        texelSize: [1.0 / w, 1.0 / h],
        get read() { return fbo1; },
        get write() { return fbo2; },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    };

    // High quality simulation grid (aspect scaled, 256 height)
    const SIM_RESOLUTION = 256;
    let simWidth, simHeight;
    let velocityFBO, densityFBO, divergenceFBO, curlFBO, pressureFBO;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const aspect = width / height;
      if (aspect > 1) {
        simHeight = SIM_RESOLUTION;
        simWidth = Math.round(SIM_RESOLUTION * aspect);
      } else {
        simWidth = SIM_RESOLUTION;
        simHeight = Math.round(SIM_RESOLUTION / aspect);
      }

      velocityFBO = createDoubleFBO(simWidth, simHeight);
      densityFBO = createDoubleFBO(simWidth, simHeight);
      divergenceFBO = createFBO(simWidth, simHeight);
      curlFBO = createFBO(simWidth, simHeight);
      pressureFBO = createDoubleFBO(simWidth, simHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse Interaction with Continuous Path Interpolation
    const splats = [];
    let prevMouse = { x: -1, y: -1 };
    let hasMoved = false;

    const onMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Update Minimalist Crosshair (+) instantly
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        if (!hasMoved) {
          crosshairRef.current.style.opacity = '1';
          hasMoved = true;
        }
      }

      if (prevMouse.x === -1) {
        prevMouse.x = currentX;
        prevMouse.y = currentY;
        return;
      }

      const dx = currentX - prevMouse.x;
      const dy = currentY - prevMouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 0.5) return;

      // Continuous Linear Interpolation: Splat every 8px along the mouse stroke
      // This forms Stas Bondar's signature unbroken molten fluid ribbon
      const steps = Math.min(16, Math.max(1, Math.floor(dist / 8)));
      
      const speed = dist;
      // Stas Bondar thick luminous crimson bulb
      const intensity = Math.min(1.8, speed * 0.045 + 0.85);
      const baseRadius = 0.0035; // Larger volumetric bulb size

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = prevMouse.x + dx * t;
        const py = prevMouse.y + dy * t;

        const normX = px / window.innerWidth;
        const normY = 1.0 - py / window.innerHeight;
        const normVx = (dx / steps) * 18.0;
        const normVy = (-dy / steps) * 18.0;

        splats.push({
          x: normX,
          y: normY,
          vx: normVx,
          vy: normVy,
          color: [intensity, 0.0, 0.0],
          radius: baseRadius
        });
      }

      prevMouse.x = currentX;
      prevMouse.y = currentY;
    };

    const onMouseLeave = () => {
      prevMouse.x = -1;
      prevMouse.y = -1;
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = '0';
        hasMoved = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // WebGL Pipeline Passes
    const stepSplat = (targetFBO, point, color, radius) => {
      gl.useProgram(progSplat);
      bindQuad(progSplat);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, targetFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progSplat, 'u_target'), 0);
      gl.uniform1f(gl.getUniformLocation(progSplat, 'u_aspectRatio'), canvas.width / canvas.height);
      gl.uniform2f(gl.getUniformLocation(progSplat, 'u_point'), point[0], point[1]);
      gl.uniform3f(gl.getUniformLocation(progSplat, 'u_color'), color[0], color[1], color[2]);
      gl.uniform1f(gl.getUniformLocation(progSplat, 'u_radius'), radius);

      gl.bindFramebuffer(gl.FRAMEBUFFER, targetFBO.write.fbo);
      gl.viewport(0, 0, targetFBO.width, targetFBO.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      targetFBO.swap();
    };

    const stepAdvection = (velocityFBO, sourceFBO, targetFBO, dissipation, dt) => {
      gl.useProgram(progAdvection);
      bindQuad(progAdvection);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progAdvection, 'u_velocity'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, sourceFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progAdvection, 'u_source'), 1);
      gl.uniform2f(gl.getUniformLocation(progAdvection, 'u_texelSize'), sourceFBO.texelSize[0], sourceFBO.texelSize[1]);
      gl.uniform1f(gl.getUniformLocation(progAdvection, 'u_dt'), dt);
      gl.uniform1f(gl.getUniformLocation(progAdvection, 'u_dissipation'), dissipation);

      gl.bindFramebuffer(gl.FRAMEBUFFER, targetFBO.write.fbo);
      gl.viewport(0, 0, targetFBO.width, targetFBO.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      targetFBO.swap();
    };

    const stepCurl = () => {
      gl.useProgram(progCurl);
      bindQuad(progCurl);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progCurl, 'u_velocity'), 0);
      gl.uniform2f(gl.getUniformLocation(progCurl, 'u_texelSize'), velocityFBO.texelSize[0], velocityFBO.texelSize[1]);

      gl.bindFramebuffer(gl.FRAMEBUFFER, curlFBO.fbo);
      gl.viewport(0, 0, simWidth, simHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const stepVorticity = (dt) => {
      gl.useProgram(progVorticity);
      bindQuad(progVorticity);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progVorticity, 'u_velocity'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, curlFBO.texture);
      gl.uniform1i(gl.getUniformLocation(progVorticity, 'u_curl'), 1);
      // Gentle vorticity for smooth organic eddies
      gl.uniform1f(gl.getUniformLocation(progVorticity, 'u_curlStrength'), 14.0);
      gl.uniform1f(gl.getUniformLocation(progVorticity, 'u_dt'), dt);
      gl.uniform2f(gl.getUniformLocation(progVorticity, 'u_texelSize'), velocityFBO.texelSize[0], velocityFBO.texelSize[1]);

      gl.bindFramebuffer(gl.FRAMEBUFFER, velocityFBO.write.fbo);
      gl.viewport(0, 0, simWidth, simHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      velocityFBO.swap();
    };

    const stepDivergence = () => {
      gl.useProgram(progDivergence);
      bindQuad(progDivergence);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progDivergence, 'u_velocity'), 0);
      gl.uniform2f(gl.getUniformLocation(progDivergence, 'u_texelSize'), velocityFBO.texelSize[0], velocityFBO.texelSize[1]);

      gl.bindFramebuffer(gl.FRAMEBUFFER, divergenceFBO.fbo);
      gl.viewport(0, 0, simWidth, simHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const stepPressure = () => {
      gl.useProgram(progPressure);
      bindQuad(progPressure);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, divergenceFBO.texture);
      gl.uniform1i(gl.getUniformLocation(progPressure, 'u_divergence'), 1);
      gl.uniform2f(gl.getUniformLocation(progPressure, 'u_texelSize'), pressureFBO.texelSize[0], pressureFBO.texelSize[1]);

      // 18 relaxation iterations for crisp incompressibility
      for (let i = 0; i < 18; i++) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressureFBO.read.texture);
        gl.uniform1i(gl.getUniformLocation(progPressure, 'u_pressure'), 0);

        gl.bindFramebuffer(gl.FRAMEBUFFER, pressureFBO.write.fbo);
        gl.viewport(0, 0, simWidth, simHeight);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        pressureFBO.swap();
      }
    };

    const stepGradientSubtract = () => {
      gl.useProgram(progGradSubtract);
      bindQuad(progGradSubtract);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pressureFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progGradSubtract, 'u_pressure'), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocityFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progGradSubtract, 'u_velocity'), 1);
      gl.uniform2f(gl.getUniformLocation(progGradSubtract, 'u_texelSize'), velocityFBO.texelSize[0], velocityFBO.texelSize[1]);

      gl.bindFramebuffer(gl.FRAMEBUFFER, velocityFBO.write.fbo);
      gl.viewport(0, 0, simWidth, simHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      velocityFBO.swap();
    };

    const renderDisplay = () => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.enable(gl.BLEND);
      // Additive / Premultiplied luminous blending
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      gl.useProgram(progDisplay);
      bindQuad(progDisplay);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, densityFBO.read.texture);
      gl.uniform1i(gl.getUniformLocation(progDisplay, 'u_density'), 0);
      gl.uniform2f(gl.getUniformLocation(progDisplay, 'u_texelSize'), densityFBO.texelSize[0], densityFBO.texelSize[1]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.disable(gl.BLEND);
    };

    let animId;
    let lastTime = performance.now();

    const update = (now) => {
      const dt = Math.min((now - lastTime) / 1000.0, 0.033);
      lastTime = now;

      // 1. Process interpolated mouse splats
      while (splats.length > 0) {
        const s = splats.shift();
        stepSplat(velocityFBO, [s.x, s.y], [s.vx, s.vy, 0.0], s.radius);
        stepSplat(densityFBO, [s.x, s.y], s.color, s.radius * 1.35);
      }

      // 2. Vorticity Confinement
      stepCurl();
      stepVorticity(dt);

      // 3. Pressure Solve
      stepDivergence();
      stepPressure();
      stepGradientSubtract();

      // 4. Advection with Stas Bondar dissipation rate (~1.5s lingering ribbon)
      stepAdvection(velocityFBO, velocityFBO, velocityFBO, 0.982, dt);
      stepAdvection(velocityFBO, densityFBO, densityFBO, 0.973, dt);

      // 5. Render Stas Bondar Crimson Display
      renderDisplay();
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.body.classList.remove('fluid-cursor-active');

      gl.deleteBuffer(quadBuffer);
      const deleteDoubleFBO = (fbo) => {
        if (!fbo) return;
        gl.deleteTexture(fbo.read.texture);
        gl.deleteFramebuffer(fbo.read.fbo);
        gl.deleteTexture(fbo.write.texture);
        gl.deleteFramebuffer(fbo.write.fbo);
      };
      deleteDoubleFBO(velocityFBO);
      deleteDoubleFBO(densityFBO);
      deleteDoubleFBO(pressureFBO);
      if (divergenceFBO) {
        gl.deleteTexture(divergenceFBO.texture);
        gl.deleteFramebuffer(divergenceFBO.fbo);
      }
      if (curlFBO) {
        gl.deleteTexture(curlFBO.texture);
        gl.deleteFramebuffer(curlFBO.fbo);
      }
    };
  }, [isSupported]);

  if (!isSupported) return null;

  return (
    <>
      {/* Fullscreen transparent WebGL Fluid Canvas */}
      <canvas ref={canvasRef} className="fluid-flame-canvas" />

      {/* Stas Bondar Minimalist Thin White Crosshair (+) */}
      <div ref={crosshairRef} className="fluid-crosshair-pointer" aria-hidden="true">
        <div className="crosshair-axis crosshair-h" />
        <div className="crosshair-axis crosshair-v" />
      </div>
    </>
  );
}
