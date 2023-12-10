"use client";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Image from "next/image";

const S3_BASE = "https://songssongs.s3.ap-southeast-1.amazonaws.com";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(
    "https://songssongs.s3.ap-southeast-1.amazonaws.com/nadhif.mp3"
  );

  const fetchData = async () => {
    const response = await fetch("/api/songs");
    const songs = await response.json();
    setSongs(songs.rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderView = () => {
    return songs.map((song, index) => (
      <div key={`${song}-${index}`} className="flex w-1/4 flex-wrap m-2">
        <div className="w-full p-1 md:p-6 bg-black bg-opacity-20 rounded-xl">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()
              setCurrentSong(`${S3_BASE}/${song.audioUrl}`);
            }}
          >
            <Image
              alt="gallery"
              className="block h-4/5 w-full rounded-lg object-cover object-center"
              src={`${S3_BASE}/${song.bannerUrl}`}
              width={0}
              height={0}
              sizes="100vw"
              priority
            />
          </a>
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
            <a href="#" className="hover:text-white text-white">
              <Image
                src="/home.svg"
                alt="Search Logo"
                className="inline mr-5 hover:fill-white"
                width={20}
                height={20}
                priority
              />
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white text-white">
              <Image
                src="/search.svg"
                alt="Search Logo"
                className="inline mr-5"
                width={20}
                height={20}
                priority
              />
              Search
            </a>
          </li>
        </ul>
      </div>
      <div className="main-view">
        <div className="lg:p-5 lg:pt-5">
          <div className="-m-1 flex justify-center flex-wrap md:-m-2">
            {renderView()}
          </div>
        </div>
      </div>
      <div className="bottom-menu"></div>
      <div className="footer p-2 rounded-lg">
        <ReactAudioPlayer src={currentSong} controls loop autoPlay />
      </div>
    </div>
  );
}
