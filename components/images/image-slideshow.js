// There are components that must be rendered on the client because they contain some code
// or use some features that are only available on the client.
// Like for example here in this image slideshow JS file, they use state hook, or the use fact hook.
// These hooks are not available on the Server side, which makes sense if you think about it,
// because we're not interested in setting this interval on the Server side, 
// we wanna run this in the browser so that the image swaps every five seconds after the page has been loaded.
// Another example for a feature that would only be available in client components would be event handlers.
// If you would use the on click prop to trigger some function, obviously since you are waiting
// for some user interaction here, that would require to be a client component
// because that would require code that runs on the client. But since by default in NextJS,
// all components are Server components, you have to explicitly tell NextJS
// if you wanna build a client component by using a special directive at the top of the file 
// that holds that component. You have to add the use client directive, 
// and that then allows you to use client site features in your component.
// Like event handlers or use effect and use state.
// Therefore here, in order to make this slideshow component work,
// we have to add this use client directive at the top of this file, like below here.

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}