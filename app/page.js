"use client";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Image from 'next/image'

export default function Home() {
  const [songs, setSongs] = useState([]);
  const fetchData = async () => {
    await fetch("/api/songs");
  };
  eval("1+1")

  useEffect(() => {
    // fetchData();
    const data = [
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      },
      {
        title: "Penjaga Hati",
        album: "Nadhif Basalamah",
      }
    ];

    setSongs(data);
  }, []);

  const renderView = () => {
    return songs.map((song, index) => (
      <div key={`${song}-${index}`} className="flex w-1/4 flex-wrap m-2">
        <div className="w-full p-1 md:p-6 bg-black bg-opacity-20 rounded-xl">
          <Image
            alt="gallery"
            className="block h-4/5 w-full rounded-lg object-cover object-center"
            src="https://songssongs.s3.ap-southeast-1.amazonaws.com/nadhif.jpg"
            width={0}
            height={0}
            sizes="100vw"
          />
          <h1 className="title text-xl mt-2">{song.title}</h1>
          <h3 className="albums">{song.album}</h3>
        </div>
      </div>
    ));
  };

  return (
    <div className="grid-container">
      <div className="menu">
        <ul>
          <li>
            <a
              href="#"
              className="hover:font-black dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:font-black dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Search
            </a>
          </li>
        </ul>
      </div>
      <div className="main-view">
        <div className="container lg:p-5 lg:pt-5">
          <div className="-m-1 flex justify-center flex-wrap md:-m-2">
            {renderView()}
          </div>
        </div>
      </div>
      <div className="bottom-menu"></div>
      <div className="now-playing-bar">
        <ReactAudioPlayer
          src="https://songssongs.s3.ap-southeast-1.amazonaws.com/ph.mp3"
          controls
          loop
          autoPlay         
        />
      </div>
    </div>
  );
}
