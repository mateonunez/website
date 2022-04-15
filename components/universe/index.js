/* eslint-disable no-unused-vars */
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import { useCallback, useEffect, useRef, useState } from 'react';
import s from './universe.module.css';

const particleParameters = {
  radius: 1,
  widthSegments: 64,
  heightSegments: 64
};

export default function Universe() {
  const refContainer = useRef();

  const [camera, setCamera] = useState();
  const [scene, setScene] = useState(new THREE.Scene());
  const [renderer, setRenderer] = useState();

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;

    if (container && renderer) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(containerWidth, containerHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderer]);

  useEffect(() => {
    const { current: container } = refContainer;
    if (container && !renderer) {
      const particles = [];

      // Helper
      scene.add(new THREE.AxesHelper(5));

      // Sizes
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight; // 100px for header

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(containerWidth, containerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      // Camera
      const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
      camera.position.set(0, 0, -30);
      // camera.lookAt(0, 0, 0);

      setCamera(camera);

      // Controls
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.update();
      controls.addEventListener('change', () => console.log('Controls Change'));
      controls.addEventListener('start', () => console.log('Controls Start Event'));
      controls.addEventListener('end', () => console.log('Controls End Event'));
      controls.enabled = false;
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.keys = ['KeyA', 'KeyS', 'KeyD'];
      controls.noPan = true; //default false
      controls.noRotate = true; //default false
      controls.noZoom = true; //default false
      controls.staticMoving = true; //default false
      controls.dynamicDampingFactor = 0.1;
      controls.maxDistance = 4;
      controls.minDistance = 2;

      // Light
      const light = new THREE.PointLight({
        color: 0xffffff,
        intensity: 3
      });
      scene.add(light);

      /**
       * UNIVERSE
       */
      const universe = new THREE.Object3D();
      scene.add(universe);
      particles.push(universe);

      /**
       * Geometry
       */
      const particleGeometry = new THREE.SphereGeometry(
        particleParameters.radius,
        particleParameters.widthSegments,
        particleParameters.heightSegments
      );

      /**
       * SUN
       */
      const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
      const sunMesh = new THREE.Mesh(particleGeometry, sunMaterial);
      sunMesh.scale.set(5, 5, 5);
      universe.add(sunMesh);
      particles.push(sunMesh);

      /**
       *
       * EARTH
       *
       */

      // Orbit
      const earthOrbit = new THREE.Object3D();
      earthOrbit.position.setX(10);
      universe.add(earthOrbit);
      particles.push(earthOrbit);

      // Mesh
      const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
      const earthMesh = new THREE.Mesh(particleGeometry, earthMaterial);
      earthOrbit.add(earthMesh);
      particles.push(earthMesh);

      /**
       *
       * MOON
       *
       */

      // Orbit
      const moonOrbit = new THREE.Object3D();
      moonOrbit.position.setX(2);
      earthOrbit.add(moonOrbit);

      // Mesh
      const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
      const moonMesh = new THREE.Mesh(particleGeometry, moonMaterial);
      moonMesh.scale.set(0.5, 0.5, 0.5);
      moonOrbit.add(moonMesh);
      particles.push(moonMesh);

      // Animate
      let req = null;
      const animate = time => {
        time *= 0.001;

        particles.forEach(particle => {
          particle.rotation.setFromVector3(new THREE.Vector3(0, time, 0));
          particle.position.set(time, 0, 0);
        });

        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // return () => {
      //   console.log('unmount');
      //   cancelAnimationFrame(req);
      //   renderer.dispose();
      // };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <>
      <div ref={refContainer} className={s.root}></div>
    </>
  );
}
