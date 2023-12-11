"use client";

import { useEffect, useState } from "react";
import AWS from "aws-sdk";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [songFile, setSongFile] = useState(null);
  const [albumFile, setAlbumFile] = useState(null);
  const [albumName, setAlbumName] = useState(null);
  const [songTitle, setSongTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSongFileChange = (e) => {
    switch (e.target.name) {
      case "song": {
        const file = e.target.files[0];
        setSongFile(file);
        break;
      }
      case "album": {
        const file = e.target.files[0];
        setAlbumFile(file);
        break;
      }
      case "albumName": {
        setAlbumName(e.target.value);
        break;
      }
      default: {
        setSongTitle(e.target.value);
        break;
      }
    }
  };

  const uploadFile = async (file) => {
    // S3 Bucket Name
    const S3_BUCKET = "songssongs";

    // S3 Region
    const REGION = "ap-southeast-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "AKIAXMCF2MVY7TOLIDLR",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ACL: "public-read",
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
    });

    return file.name;
  };

  async function onSubmit() {
    setIsLoading(true)
    const songFileName = await uploadFile(songFile);
    const albumFileName = await uploadFile(albumFile);
    const payload = {
      title: songTitle,
      album: albumName,
      audioUrl: songFileName,
      bannerUrl: albumFileName,
    };
    await axios.post("/api/songs", payload);
    setIsLoading(false)
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="py-6 px-9 mx-auto w-full max-w-[550px] bg-white">
        {/* <form className="py-6 px-9" onSubmit={onSubmit} method="POST"> */}
        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Song Title:
          </label>
          <input
            onChange={handleSongFileChange}
            name="title"
            id="title"
            placeholder="Song title ..."
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Song Album:
          </label>
          <input
            onChange={handleSongFileChange}
            name="albumName"
            id="albumName"
            placeholder="Song album ..."
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-6 pt-4">
          <label className="mb-5 block text-xl font-semibold text-[#07074D]">
            Audio
          </label>

          <div className="mb-8">
            <input
              onChange={handleSongFileChange}
              name="song"
              type="file"
              id="song"
              className="sr-only"
            />
            <label
              htmlFor="song"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop audio file here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="mb-6 pt-4">
          <label className="mb-5 block text-xl font-semibold text-[#07074D]">
            Banner Image
          </label>

          <div className="mb-8">
            <input
              type="file"
              onChange={handleSongFileChange}
              name="album"
              id="album"
              className="sr-only"
            />
            <label
              htmlFor="album"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                  Drop album image file here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  Browse
                </span>
              </div>
            </label>
          </div>

          {/* <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
            <div className="flex items-center justify-between">
              <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                banner-design.png
              </span>
              <button className="text-[#07074D]">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
          <div className="flex items-center justify-between">
            <span className="truncate pr-3 text-base font-medium text-[#07074D]">
              banner-design.png
            </span>
            <button className="text-[#07074D]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div> */}

          <div className="flex justify-center items-center align-middle">
            <button
              disabled={isLoading}
              onClick={() => onSubmit()}
              className="hover:shadow-form w-1/3 mx-1 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              {isLoading ? "Loading..." : "Send File"}
            </button>
            <Link
              className="hover:shadow-form w-1/3 mx-1 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              href={{
                pathname: "/",
              }}
            >
              <button>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
