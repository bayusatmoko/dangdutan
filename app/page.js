"use client";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Image from "next/image";
import Link from 'next/link'

const S3_BASE = "https://songssongs2.s3.ap-southeast-1.amazonaws.com";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(
    "https://songssongs2.s3.ap-southeast-1.amazonaws.com/nadhif.mp3"
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
      <div key={`${song}-${index}`} className="flex sm:w-1/4 md:w-1/4 w-full flex-wrap m-4">
        <div className="w-full p-2 md:p-6 bg-black bg-opacity-20 rounded-xl">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              setCurrentSong(`${S3_BASE}/${song.audioUrl}`);
            }}
          >
            <Image
              alt="gallery"
              className="block md:h-4/5 sm:h-3/5 xs:h-2/5 w-full rounded-lg object-cover object-center"
              src={`${S3_BASE}/${song.bannerUrl}`}
              width={0}
              height={0}
              sizes="100vw"
              priority
            />
          </a>
          <h1 className="title text-xs lg:text-lg pt-2">{song.title}</h1>
          <h3 className="albums text-xs lg:text-lg">{song.album}</h3>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-1 md:flex ...">
      <div className="grid-container">
        <div className="menu hidden lg:flex ...">
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
            <li>
              <Link href="/upload" className="hover:text-white text-white">
                <Image
                  src="/upload.svg"
                  alt="Upload Logo"
                  className="inline mr-5"
                  width={20}
                  height={20}
                  priority
                />
                Upload
              </Link>
            </li>
          </ul>
        </div>
        <div className="main-view">
          <div className="md:p-2">
            <h1 className="text-center text-xl my-2 font-extrabold">Songs For You</h1>
            <div className="-m-1 flex justify-center flex-wrap md:-m-2">
              {renderView()}
            </div>
          </div>
        </div>
        <div className="bottom-menu hidden lg:block ..."></div>
        <div className="footer p-2 rounded-lg hidden mb-4 lg:flex ...">
          <ReactAudioPlayer src={currentSong} controls loop autoPlay />
        </div>
      </div>
    </div>
  );
}
