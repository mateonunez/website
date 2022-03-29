/* eslint-disable no-unused-vars */
import * as THREE from 'three';

import { useCallback, useEffect, useRef, useState } from 'react';
import s from './universe.module.css';

export default function Universe() {
  const refContainer = useRef();

  const [camera, setCamera] = useState();
  const [scene, setScene] = useState();
  const [renderer, setRenderer] = useState();

  const [sphereGeometry, setSphereGeometry] = useState();
  const [sphereMaterial, setSphereMaterial] = useState();
  const [sphere, setSphere] = useState();

  const [zoom, setZoom] = useState(1.0);
  const [zoomAceleration, setZoomAceleration] = useState(-0.01);

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;
    if (container && renderer) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerWidth, containerHeight);
    }
  }, [renderer]);

  useEffect(() => {
    const { current: container } = refContainer;
    if (container && !renderer) {
      // Scene
      const scene = new THREE.Scene();

      // Sizes
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight; // 100px for header

      // Camera
      const camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000);

      console.log(camera.fov);

      camera.position.z = 10;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      setCamera(camera);

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(containerWidth, containerHeight);
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      // Sphere
      const sphereGeometry = new THREE.SphereGeometry(0.5, 50, 50);
      const sphereMaterial = new THREE.MeshNormalMaterial();
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

      // Scene
      scene.add(sphere);
      setScene(scene);

      // Animate
      let req = null;
      const animate = () => {
        req = requestAnimationFrame(animate);

        camera.fov *= zoom;
        camera.updateMatrixWorld();

        const zoomAccelerated = zoom + zoomAceleration;
        setZoom(zoomAccelerated);

        if (zoomAccelerated <= 0.2 || zoomAccelerated >= 0.9) {
          setZoomAceleration(-zoomAceleration);
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        console.log('unmount');
        // cancelAnimationFrame(req);
        // renderer.dispose();
      };
    }
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
