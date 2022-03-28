/* eslint-disable no-unused-vars */
import * as THREE from 'three';

import { useCallback, useEffect, useRef, useState } from 'react';
import s from './universe.module.css';

const emptyArray = [...new Array(3)];

export default function Universe() {
  const refContainer = useRef();

  const [renderer, setRenderer] = useState();

  const randomParticles = count => {
    console.log(count);
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      array[i] = (Math.random() - 0.5) * 10;
    }

    return array;
  };

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;
    if (container && renderer) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

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
      const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 1000);
      camera.position.z = 1;

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(containerWidth, containerHeight);
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const geometries = emptyArray.map(() => new THREE.BufferGeometry());
      geometries.map((geometry, index) => {
        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(randomParticles(Math.floor(Math.random() + 1) * 100 + 333), 3)
        );
      });

      // Sprite
      const sprite = new THREE.TextureLoader().load('/images/dot.png');

      const materials = emptyArray.map(
        (_, index) =>
          new THREE.PointsMaterial({
            // color: 0xaaaaaa,
            size: 0.005 + index * 0.0001,
            map: sprite,
            transparent: true
          })
      );

      // Stars
      const stars = emptyArray.map(
        (_, index) => new THREE.Points(geometries[index], materials[index])
      );

      // Adding velocity and acceleration here
      // stars.map(star => {
      //   star.velocity = new THREE.Vector3(0, 0, 0);
      //   star.acceleration = new THREE.Vector3(0, 0, 0);
      // });

      stars.map(star => scene.add(star));

      // Animate
      let req = null;
      const animate = () => {
        stars.forEach(star => {
          star.position.x += 0.001;
          star.position.y -= -0.001;
        });

        req = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      // requestAnimationFrame(animate);

      animate();

      return () => {
        console.log('unmount');
        cancelAnimationFrame(req);
        renderer.dispose();
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
