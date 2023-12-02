"use client";
import ThemeManager from "@/app/components/ThemeManager";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  useState,
  useRef,
  ChangeEvent,
  ReactEventHandler,
} from "react";

export default function ImageEditor() {
  const [saturation, setSaturation] = useState(50);
  const [brightness, setBrightness] = useState(50);
  const [inversion, setInversion] = useState(50);
  const [grayscale, setGrayscale] = useState(50);
  const [zoomValue, setZoomValue] = useState(1);
  const imageWindow = useRef< | null>(null);
  const [imageWindowDimension, setImageWindowDimension] = useState({
    height: 100,
    width: 100,
  });

  const [imageSrc, setImageSrc] = useState({
    src: {},
    data: { width: 0, height: 0 },
  });
  const chooseFileBtn = useRef(null);
  const [uploaded, setUploaded] = useState(true);

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.width);

      reader.onload = function (event) {
        setImageSrc({
          src: event.target?.result,
          data: { width: 720, height: 1280 },
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setUploaded(true);
  }

  function handleReset() {
    setUploaded(false);
  }

  function setNaturalDimension(e: ReactEventHandler<HTMLImageElement>) {
    if(!imageWindow.current) return;
    setImageWindowDimension({
      height: imageWindow.current.offsetHeight,
      width: imageWindow.current.offsetWidth,
    });
  }

  return (
    <>
      <ThemeManager />

      {/* image input field */}
      <input
        ref={chooseFileBtn}
        onChange={handleImageUpload}
        type="file"
        accept="image/*"
        hidden
      />

      <div className="p-5 w-screen h-screen bg-white text-black space-y-5">
        {/* Top section */}
        <div className="text-5xl pl-5 font-bold text-center">
          Easy Image Editor
        </div>

        {/* Body section */}
        {!uploaded && (
          <div className="flex justify-center pt-10">
            <div
              onClick={() => chooseFileBtn.current?.click()}
              className="flex flex-col justify-center items-center rounded-xl bg-gray-100 select-none border-4 border-gray-400 border-dashed hover:border-8 text-slate-400 hover:text-slate-500 p-10"
            >
              <FontAwesomeIcon icon={faImage} className="text-9xl" />
              <span className="text-2xl uppercase text-center">
                Choose your Image
              </span>
            </div>
          </div>
        )}
        {uploaded && (
          <div className="flex gap-5 h-[80vh]">
            {/* left section */}
            <div className="flex-[2] p-2 rounded-lg border-2 border-gray-400 w-full h-full">
              <div className="flex flex-col justify-center">
                <label
                  htmlFor="range-saturation"
                  className="flex justify-between items-center mb-2"
                >
                  <span>Saturation</span>
                  <div className="relative">
                    <input
                      type="number"
                      maxLength={3}
                      minLength={1}
                      value={saturation}
                      min={0}
                      max={100}
                      className="hover:none w-full border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-400 bg-white"
                      onChange={(e) => setSaturation(parseInt(e.target.value))}
                    />
                    <span className="absolute inset-y-0 right-0 mr-5 flex items-center text-gray-600">
                      %
                    </span>
                  </div>
                </label>
                <input
                  type="range"
                  className="range range-info range-sm"
                  min={0}
                  max={100}
                  step={1}
                  value={saturation}
                  onChange={(e) => setSaturation(parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col justify-center">
                <label
                  htmlFor="range-Brightness"
                  className="flex justify-between items-center mb-2"
                >
                  <span>Brightness</span>
                  <div className="relative">
                    <input
                      type="number"
                      maxLength={3}
                      minLength={1}
                      value={brightness}
                      min={0}
                      max={100}
                      className="hover:none w-full border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-400 bg-white"
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                    />
                    <span className="absolute inset-y-0 right-0 mr-5 flex items-center text-gray-600">
                      %
                    </span>
                  </div>
                </label>
                <input
                  type="range"
                  className="range range-info range-sm"
                  min={0}
                  max={100}
                  step={1}
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col justify-center">
                <label
                  htmlFor="range-Grayscale"
                  className="flex justify-between items-center mb-2"
                >
                  <span>Grayscale</span>
                  <div className="relative">
                    <input
                      type="number"
                      maxLength={3}
                      minLength={1}
                      value={grayscale}
                      min={0}
                      max={100}
                      className="hover:none w-full border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-400 bg-white"
                      onChange={(e) => setGrayscale(parseInt(e.target.value))}
                    />
                    <span className="absolute inset-y-0 right-0 mr-5 flex items-center text-gray-600">
                      %
                    </span>
                  </div>
                </label>
                <input
                  type="range"
                  className="range range-info range-sm"
                  min={0}
                  max={100}
                  step={1}
                  value={grayscale}
                  onChange={(e) => setGrayscale(parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col justify-center">
                <label
                  htmlFor="range-saturation"
                  className="flex justify-between items-center mb-2"
                >
                  <span>Inversion</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={inversion}
                      min={0}
                      max={100}
                      className="hover:none w-full border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-400 bg-white"
                      onChange={(e) => setInversion(parseInt(e.target.value))}
                    />
                    <span className="absolute inset-y-0 right-0 mr-5 flex items-center text-gray-600">
                      %
                    </span>
                  </div>
                </label>
                <input
                  type="range"
                  className="range range-info range-sm"
                  min={0}
                  max={100}
                  step={1}
                  value={inversion}
                  onChange={(e) => setInversion(parseInt(e.target.value))}
                />
              </div>

              <div className="flex flex-col justify-center">
                <label
                  htmlFor="range-saturation"
                  className="flex justify-between items-center mb-2"
                >
                  <span>Zoom</span>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={200}
                      step={1}
                      className="hover:none w-full border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-400 bg-white"
                      onChange={(e) => setZoomValue(parseInt(e.target.value))}
                      value={zoomValue}
                    />
                    <span className="absolute inset-y-0 right-0 mr-5 flex items-center text-gray-600">
                      %
                    </span>
                  </div>
                </label>
                <input
                  type="range"
                  className="range range-info range-sm"
                  min={1}
                  max={200}
                  step={1}
                  value={zoomValue}
                  onChange={(e) => setZoomValue(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Right section */}
            <div
              ref={imageWindow}
              className="flex-[5] h-full rounded-lg border-2 border-gray-50 bg-black overflow-auto p-10"
            >
              <div className="m-auto flex justify-center items-center h-full">
                <Image
                  width={1000}
                  height={1000}
                  src="/friends_images/rohit.jpg"
                  alt=""
                  onLoad={setNaturalDimension}
                  style={{
                    scale: zoomValue,
                    width: imageWindowDimension.width,
                    height: imageWindowDimension.height,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom section */}
        {uploaded && (
          <div className="flex justify-between">
            <div>
              <button
                onClick={handleReset}
                className="rounded-lg p-2 bg-white border-2 border-orange-400 text-orange-400 hover:text-white hover:bg-orange-400"
              >
                Reset Default
              </button>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => chooseFileBtn.current!.click()}
                className="rounded-lg p-2 bg-gray-300 text-black hover:bg-gray-400"
              >
                Choose Image
              </button>
              <button className="rounded-lg p-2 bg-blue-600 text-white hover:bg-blue-700">
                Save Image
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
