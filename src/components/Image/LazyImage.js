/**
 * LazyImage
 *
 */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

if (typeof window !== 'undefined') {
  require('intersection-observer');
}

const StyledImage = styled.img`
  transition: opacity ease-in-out 0.3s;
  opacity: ${(props) => (props.visible ? 1 : 0.5)};
`;

// single pixel gray png
const DEFAULT_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM89x8AAqEBz+RdzIIAAAAASUVORK5CYII=';
/**
 * useIntersection
 *   Observe intersection and update when element enters/exits
 */
// function useIntersection({ ref, options }) {
//   const [observerEntry, setEntry] = useState({});

//   useEffect(() => {
//     let observer;

//     if (ref) {
//       observer = new IntersectionObserver(
//         ([entry]) => setEntry(entry),
//         options
//       );

//       observer.observe(ref.current);
//     }

//     return function cleanup() {
//       if (observer) {
//         observer.disconnect();
//       }
//     };
//   }, [ref]);

//   return observerEntry;
// }

/**
 * useIntersectionOnce
 *   Observe intersection until element is intersected for the first time.
 *   After that, remove observer to prevent rerendering
 */
function useIntersectionOnce({ ref, options, intersected }) {
  const [observerEntry, setEntry] = useState({});

  useEffect(() => {
    let observer;

    if (!intersected && ref) {
      observer = new IntersectionObserver(
        ([entry]) => setEntry(entry),
        options
      );

      observer.observe(ref.current);
    }

    return function cleanup() {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, intersected]);

  return observerEntry;
}

const LazyImg = (props) => {
  const imgEl = useRef(null);
  const [intersected, setIntersected] = useState(false);
  const entry = useIntersectionOnce({
    ref: imgEl,
    options: {
      threshold: props.threshold,
    },
    intersected: intersected,
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const placeholder = props.placeholder || DEFAULT_PLACEHOLDER;

  if (!intersected && entry.isIntersecting) {
    setIntersected(true);
  }

  useEffect(() => {
    if (intersected) {
      const img = new Image();
      img.onload = (e) => {
        setLoaded(true);
      };
      img.onerror = (e) => {
        setError(e);
      };
      img.src = props.src;
    }
  }, [intersected]);

  return (
    <StyledImage
      ref={imgEl}
      src={!error && loaded ? props.src : placeholder}
      alt={props.alt}
      className={props.className}
      style={props.style}
      visible={intersected}
      onClick={props.onClick}
    />
  );
};

export const LazyImage = React.memo(LazyImg);

// const Img = styled.div`
//   position: relative;
//   display: inline-block;
//   vertical-align: middle;
//   width: 100%;
//   height: ${props => props.height};
//   margin: 0;
//   background-image: url(${props => props.src});
//   background-size: cover;
//   background-position: 50% 15%;
//   cursor: ${props => (props.onClick ? 'pointer' : 'auto')};
// `;
const BackgroundImage = styled.div`
  transition: opacity ease-in-out 0.3s;
  opacity: ${(props) => (props.visible ? 1 : 0.5)};
  background-repeat: no-repeat;
  background-size: auto;
  background-image: url(${(props) => props.src});
`;

const LazyBackgroundImg = (props) => {
  const imgEl = useRef(null);
  const [intersected, setIntersected] = useState(false);
  const entry = useIntersectionOnce({
    ref: imgEl,
    options: {
      threshold: props.threshold,
    },
    intersected: intersected,
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const placeholder = props.placeholder || DEFAULT_PLACEHOLDER;

  if (!intersected && entry.isIntersecting) {
    setIntersected(true);
  }

  useEffect(() => {
    if (intersected) {
      const img = new Image();
      img.onload = (e) => {
        setLoaded(true);
      };
      img.onerror = (e) => {
        setError(e);
      };
      img.src = props.src;
    }
  }, [intersected]);

  return (
    <BackgroundImage
      ref={imgEl}
      src={!error && loaded ? props.src : placeholder}
      className={props.className}
      style={props.style}
      visible={intersected}
      onClick={props.onClick}
    >
      {props.children || null}
    </BackgroundImage>
  );
};

export const LazyBackgroundImage = React.memo(LazyBackgroundImg);
